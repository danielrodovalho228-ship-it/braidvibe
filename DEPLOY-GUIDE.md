# BraidVibe — Guia de Deploy Completo

## 1. Deploy no VPS (Hostinger)

Seu VPS: `76.13.103.233` (Ubuntu 24.04)

### Passo 1: Conecte via SSH
```bash
ssh root@76.13.103.233
```

### Passo 2: Instale Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx certbot python3-certbot-nginx
```

### Passo 3: Upload e Build
```bash
mkdir -p /var/www/braidvibe
cd /var/www/braidvibe
# Upload a pasta braidvibe-deploy para este diretorio
npm install
npm run build
```

### Passo 4: Configure o Nginx
```bash
sudo nano /etc/nginx/sites-available/braidvibe
```

Cole isto:
```nginx
server {
    listen 80;
    server_name braidvibeapp.com www.braidvibeapp.com;

    root /var/www/braidvibe/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/braidvibe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Passo 5: SSL (HTTPS)
```bash
sudo certbot --nginx -d braidvibeapp.com -d www.braidvibeapp.com
```

### Passo 6: DNS na Hostinger
Na Hostinger, vá em Domínios > braidvibeapp.com > DNS:
- Registro A: `@` → `76.13.103.233`
- Registro A: `www` → `76.13.103.233`

---

## 2. Configuração do Stripe

### Passo 1: Crie os Produtos no Stripe Dashboard
1. Acesse https://dashboard.stripe.com/products
2. Clique "Add product"
3. Crie 3 preços:
   - **BraidVibe Weekly Pro** — $2.99/semana (recurring)
   - **BraidVibe Monthly Pro** — $9.99/mês (recurring)
   - **BraidVibe Annual Pro** — $59.99/ano (recurring)

### Passo 2: Ative o Stripe Checkout
1. Em Settings > Checkout, ative "Checkout"
2. Copie suas chaves:
   - Publishable Key: `pk_live_...`
   - Secret Key: `sk_live_...`

### Passo 3: Crie Payment Links (mais simples)
1. Em https://dashboard.stripe.com/payment-links
2. Crie 3 links de pagamento (um para cada plano)
3. Copie os URLs gerados

### Passo 4: Integre no App
Substitua o PaymentModal fake por redirecionamento ao Stripe:
```jsx
// Em vez de mostrar formulário de cartão, redirecione:
const STRIPE_LINKS = {
  weekly: "https://buy.stripe.com/SEU_LINK_WEEKLY",
  monthly: "https://buy.stripe.com/SEU_LINK_MONTHLY",
  annual: "https://buy.stripe.com/SEU_LINK_ANNUAL",
};

// No botão de compra:
window.open(STRIPE_LINKS[billing], "_blank");
```

---

## 3. Banco de Dados (Supabase)

### Para que serve:
- Salvar perfil do usuário (avatar, nome, preferências)
- Salvar progresso dos tutoriais
- Salvar posts da comunidade
- Verificar se o usuário é Pro (pagou)

### Setup:
1. Acesse https://supabase.com
2. Crie projeto "BraidVibe"
3. Crie tabelas:

```sql
-- Usuários
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar JSONB,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progresso dos tutoriais
CREATE TABLE tutorial_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  tutorial_id INTEGER NOT NULL,
  completed_steps INTEGER[] DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, tutorial_id)
);

-- Posts da comunidade
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  content TEXT,
  image_url TEXT,
  braid_type TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

4. Configure a URL e anon key no app

---

## 4. Stripe Webhook (para ativar Pro automaticamente)

### No Stripe:
1. Vá em Developers > Webhooks
2. Adicione endpoint: `https://braidvibeapp.com/api/webhook`
3. Selecione evento: `checkout.session.completed`

### No backend (Supabase Edge Function):
```javascript
// supabase/functions/stripe-webhook/index.ts
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

Deno.serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const event = stripe.webhooks.constructEvent(body, sig, Deno.env.get('STRIPE_WEBHOOK_SECRET'));

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await supabase
      .from('profiles')
      .update({ is_pro: true })
      .eq('email', session.customer_email);
  }

  return new Response(JSON.stringify({ received: true }));
});
```

---

## Resumo de Custos

| Serviço | Custo |
|---------|-------|
| VPS Hostinger | Já pago (até 2027) |
| Domínio | Já pago |
| Stripe | 2.9% + $0.30 por transação |
| Supabase | Grátis (até 500MB) |
| SSL | Grátis (Let's Encrypt) |
| **Total fixo mensal** | **$0** |
