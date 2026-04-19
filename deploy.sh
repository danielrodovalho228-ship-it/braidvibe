#!/bin/bash
# ============================================================
# BraidVibe — One-Command VPS Deploy Script
# Server: 76.13.103.233 (Ubuntu 24.04)
# Domain: braidvibeapp.com
# ============================================================
set -e

echo "🔮 BraidVibe Deploy — Starting..."
echo "=================================="

# 1. Update system
echo "📦 [1/6] Updating system packages..."
apt-get update -y && apt-get upgrade -y

# 2. Install Node.js 20 + Nginx + Certbot
echo "📦 [2/6] Installing Node.js 20, Nginx, Certbot..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
apt-get install -y nginx certbot python3-certbot-nginx

echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"
echo "   Nginx: $(nginx -v 2>&1)"

# 3. Setup app directory and build
echo "🔨 [3/6] Building BraidVibe app..."
APP_DIR="/var/www/braidvibe"
mkdir -p $APP_DIR

# Copy project files (run this script from the braidvibe-deploy folder)
cp -r ./* $APP_DIR/ 2>/dev/null || true
cd $APP_DIR

npm install
npm run build

echo "   Build complete! Files in $APP_DIR/dist/"

# 4. Configure Nginx
echo "🌐 [4/6] Configuring Nginx..."
cat > /etc/nginx/sites-available/braidvibe << 'NGINX'
server {
    listen 80;
    server_name braidvibeapp.com www.braidvibeapp.com;

    root /var/www/braidvibe/dist;
    index index.html;

    # SPA — all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for 1 year
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

# Enable site
ln -sf /etc/nginx/sites-available/braidvibe /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

echo "   Nginx configured and running!"

# 5. SSL Certificate
echo "🔒 [5/6] Setting up SSL certificate..."
echo ""
echo "   ⚠️  IMPORTANT: DNS must be pointing to this server first!"
echo "   Run this command AFTER DNS propagates (can take 5-30 min):"
echo ""
echo "   certbot --nginx -d braidvibeapp.com -d www.braidvibeapp.com --non-interactive --agree-tos -m support@braidvibeapp.com"
echo ""

# Try SSL if DNS is ready
if host braidvibeapp.com 2>/dev/null | grep -q "76.13.103.233"; then
  certbot --nginx -d braidvibeapp.com -d www.braidvibeapp.com --non-interactive --agree-tos -m support@braidvibeapp.com
  echo "   ✅ SSL installed!"
else
  echo "   ⏳ DNS not ready yet. Run the certbot command above after DNS propagates."
fi

# 6. Firewall
echo "🛡️ [6/6] Configuring firewall..."
ufw allow 'Nginx Full' 2>/dev/null || true
ufw allow OpenSSH 2>/dev/null || true

echo ""
echo "============================================"
echo "🎉 BraidVibe deployed successfully!"
echo "============================================"
echo ""
echo "📋 Next steps:"
echo "  1. Configure DNS: A records for @ and www → 76.13.103.233"
echo "  2. Wait for DNS propagation (5-30 min)"
echo "  3. Run SSL: certbot --nginx -d braidvibeapp.com -d www.braidvibeapp.com --non-interactive --agree-tos -m support@braidvibeapp.com"
echo "  4. Test: https://braidvibeapp.com"
echo ""
echo "🔮 Your Hair, Your Crown, Your Story!"
