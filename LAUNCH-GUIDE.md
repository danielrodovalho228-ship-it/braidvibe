# BraidVibe — Guia de Lançamento

## Status Atual
- [x] App React completo e testado
- [x] Stripe configurado (3 produtos + Payment Links)
- [x] DNS configurado (braidvibeapp.com → 76.13.103.233)
- [ ] Deploy no VPS
- [ ] SSL (HTTPS)
- [ ] Stripe Webhook + Supabase

---

## PASSO 1: Deploy no VPS (5 minutos)

### 1a. Conecte ao VPS via SSH
```bash
ssh root@76.13.103.233
```

### 1b. Instale o necessário
```bash
apt-get update -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx certbot python3-certbot-nginx
```

### 1c. Upload dos arquivos
No seu computador local, envie a pasta braidvibe-deploy para o VPS:
```bash
# No seu computador (não no VPS):
scp -r ./braidvibe-deploy root@76.13.103.233:/var/www/braidvibe
```

OU use o FileZilla/WinSCP para enviar a pasta `braidvibe-deploy` para `/var/www/braidvibe` no VPS.

### 1d. Build do app no VPS
```bash
cd /var/www/braidvibe
npm install
npm run build
```

### 1e. Configure o Nginx
```bash
cat > /etc/nginx/sites-available/braidvibe << 'EOF'
server {
    listen 80;
    server_name braidvibeapp.com www.braidvibeapp.com;

    root /var/www/braidvibe/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
}
EOF

ln -sf /etc/nginx/sites-available/braidvibe /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
systemctl enable nginx
```

### 1f. Teste HTTP
Acesse: http://braidvibeapp.com — se o DNS já propagou, vai aparecer o app!

---

## PASSO 2: SSL / HTTPS (1 minuto)

```bash
certbot --nginx -d braidvibeapp.com -d www.braidvibeapp.com --non-interactive --agree-tos -m support@braidvibeapp.com
```

Teste: https://braidvibeapp.com

---

## PASSO 3: Supabase (5 minutos)

### 3a. Crie o projeto
1. Acesse https://supabase.com/dashboard
2. Clique "New Project"
3. Nome: "BraidVibe"
4. Escolha uma senha e região

### 3b. Crie as tabelas
1. Vá em **SQL Editor**
2. Cole o conteúdo do arquivo `supabase/schema.sql`
3. Clique "Run"

### 3c. Copie suas credenciais
Em **Settings > API**, copie:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon key**: `eyJhbG...`
- **service_role key**: `eyJhbG...` (para o webhook)

---

## PASSO 4: Stripe Webhook (3 minutos)

### 4a. Instale Supabase CLI
```bash
npm install -g supabase
```

### 4b. Deploy da Edge Function
```bash
cd /var/www/braidvibe
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase functions deploy stripe-webhook
```

### 4c. Configure as variáveis de ambiente no Supabase
Em **Settings > Edge Functions > Secrets**, adicione:
- `STRIPE_SECRET_KEY` = sua sk_live_xxx do Stripe
- `STRIPE_WEBHOOK_SECRET` = whsec_xxx (será gerado no passo seguinte)
- `SUPABASE_URL` = URL do seu projeto
- `SUPABASE_SERVICE_ROLE_KEY` = sua service_role key

### 4d. Configure o Webhook no Stripe
1. Acesse https://dashboard.stripe.com/webhooks
2. Clique "+ Add endpoint"
3. URL: `https://SEU_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
4. Eventos: `checkout.session.completed` e `customer.subscription.deleted`
5. Copie o "Signing secret" (whsec_xxx) e cole no Supabase Secrets

---

## PASSO 5: Verificação Final

```bash
# Testar se o site está online
curl -I https://braidvibeapp.com

# Testar se SSL está OK
curl -I https://www.braidvibeapp.com

# Testar o webhook (no Stripe Dashboard > Webhooks > Send test webhook)
```

### Checklist de Lançamento:
- [ ] https://braidvibeapp.com carrega o app
- [ ] https://www.braidvibeapp.com redireciona corretamente
- [ ] Cadeado HTTPS aparece no navegador
- [ ] Botão de pagamento redireciona para Stripe
- [ ] Teste de pagamento completa com sucesso
- [ ] Webhook ativa Pro no Supabase

---

## Seus Links Importantes

| O que | Link |
|-------|------|
| App | https://braidvibeapp.com |
| Stripe Dashboard | https://dashboard.stripe.com |
| Supabase Dashboard | https://supabase.com/dashboard |
| VPS SSH | `ssh root@76.13.103.233` |
| Hostinger DNS | https://hpanel.hostinger.com/domain/braidvibeapp.com/dns |
| Support Email | support@braidvibeapp.com |

## Stripe Payment Links

| Plano | Link |
|-------|------|
| Semanal ($2.99) | https://buy.stripe.com/bJe14neWH2np5Imd0J2kw02 |
| Mensal ($9.99) | https://buy.stripe.com/6oUeVdg0L5zB0o27Gp2kw01 |
| Anual ($59.99) | https://buy.stripe.com/14AeVd4i3bXZc6K8Kt2kw00 |

---

## Custos Mensais

| Serviço | Custo |
|---------|-------|
| VPS Hostinger | Já pago (até 2027) |
| Domínio | Já pago |
| Stripe | 2.9% + $0.30 por transação |
| Supabase | Grátis (até 500MB) |
| SSL | Grátis (Let's Encrypt) |
| **Total fixo** | **$0/mês** |
