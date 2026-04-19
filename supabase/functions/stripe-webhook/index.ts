// BraidVibe — Stripe Webhook Handler (Supabase Edge Function)
// Handles: checkout.session.completed → activates Pro status
// Deploy: supabase functions deploy stripe-webhook

import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

// Map Stripe price intervals to plan names
function getPlanFromSession(session: any): { plan: string; expiresAt: string } {
  const now = new Date();
  // Default to monthly if we can't determine
  let plan = "monthly";
  let expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (session.amount_total) {
    const amount = session.amount_total; // in cents
    if (amount === 299) {
      plan = "weekly";
      expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (amount === 999) {
      plan = "monthly";
      expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    } else if (amount === 5999) {
      plan = "annual";
      expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    }
  }

  return { plan, expiresAt: expiresAt.toISOString() };
}

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);

    console.log(`Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const email = session.customer_email || session.customer_details?.email;

        if (!email) {
          console.error("No email found in session");
          break;
        }

        const { plan, expiresAt } = getPlanFromSession(session);

        console.log(`Activating Pro for ${email} — Plan: ${plan}, Expires: ${expiresAt}`);

        // Upsert user profile with Pro status
        const { error } = await supabase
          .from("profiles")
          .upsert(
            {
              email: email.toLowerCase(),
              is_pro: true,
              pro_plan: plan,
              pro_expires_at: expiresAt,
              stripe_customer_id: session.customer,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "email" }
          );

        if (error) {
          console.error("Supabase error:", error);
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log(`✅ Pro activated for ${email}`);
        break;
      }

      case "customer.subscription.deleted": {
        // Handle subscription cancellation
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const { error } = await supabase
          .from("profiles")
          .update({ is_pro: false, pro_plan: null, pro_expires_at: null })
          .eq("stripe_customer_id", customerId);

        if (error) console.error("Deactivation error:", error);
        else console.log(`❌ Pro deactivated for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
});
