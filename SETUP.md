# 🚀 MaraNotter - Kurulum & Başlangıç Rehberi

## 📋 İçindekiler
1. [Sistem Gereksinimleri](#sistem-gereksinimleri)
2. [Lokal Kurulum](#lokal-kurulum)
3. [Supabase Konfigürasyonu](#supabase-konfigürasyonu)
4. [API Kurulumu](#api-kurulumu)
5. [Mobil Kurulum](#mobil-kurulum)
6. [Web Kurulumu](#web-kurulumu)
7. [Çalıştırma](#çalıştırma)

---

## 🖥️ Sistem Gereksinimleri

### Minimum Requirements
- **OS:** macOS 11+, Windows 10+, Linux (Ubuntu 20.04+)
- **RAM:** 8GB
- **Disk:** 20GB
- **Internet:** Minimum 10 Mbps

### Development Tools
```bash
# Node.js 20+
node --version

# npm 10+
npm --version

# Git
git --version

# Flutter SDK 3.10+
flutter --version

# Xcode (macOS for iOS development)
xcode-select --install

# Android Studio (for Android development)
# Download from https://developer.android.com/studio
```

---

## 🔧 Lokal Kurulum

### Adım 1: Repository'yi Clone Edin

```bash
git clone https://github.com/marameri/MaraNotter.git
cd MaraNotter
```

### Adım 2: Environment Dosyaları Oluşturun

```bash
# Backend
cp .env.example backend/.env

# Web
cp web/.env.local.example web/.env.local
```

### Adım 3: Supabase Kurulumu

Supabase hesabı oluşturmak için [supabase.io](https://supabase.io) ziyaret edin.

---

## 🗄️ Supabase Konfigürasyonu

### 1. Proje Oluşturun

1. https://supabase.io adresine gidin
2. "New Project" tıklayın
3. Proje adı: `maranotter`
4. Region seçin (latency en düşük olanı)
5. Strong password oluşturun
6. "Create new project" tıklayın

### 2. Database Migrasyonlarını Çalıştırın

1. Supabase dashboard'da "SQL Editor" açın
2. Aşağıdaki dosyaları sırasıyla çalıştırın:
   - `database/migrations/001_initial_schema.sql`
   - `database/migrations/002_row_level_security.sql`
   - `database/migrations/003_soft_delete.sql`
   - `database/migrations/004_audit_logging.sql`

### 3. Storage Bucket Oluşturun

1. "Storage" → "Create a new bucket"
2. Name: `recordings`
3. Privacy: Private
4. "Create bucket"

### 4. Storage Policy Ekleyin

Storage → recordings → Policies:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'recordings');

-- Allow users to read their own files
CREATE POLICY "Allow authenticated read"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'recordings');
```

### 5. API Keys Alın

1. "Settings" → "API"
2. Aşağıdaki değerleri kopyalayın:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### 6. Authentication Konfigürasyonu

1. "Authentication" → "Providers"
2. Email/Password'ı etkinleştirin
3. Google OAuth (opsiyonel):
   - Google Cloud Console'da OAuth 2.0 credentials oluşturun
   - Client ID ve Secret'ı ekleyin

---

## 🔗 API Kurulumu

### 1. OpenAI API Key Alın

1. https://platform.openai.com adresine gidin
2. "API keys" → "Create new secret key"
3. Key'i `.env` dosyasına ekleyin

```bash
OPENAI_API_KEY=sk-...
```

### 2. AWS S3 Kurulumu

1. AWS Console'da gidin
2. S3 → "Create bucket"
3. Bucket adı: `maranotter-recordings`
4. Region: İstediğiniz region
5. Block Public Access'ı etkinleştirin

```bash
# IAM User oluşturun
# S3 Full Access permissions verin
# Access Key ID ve Secret Access Key'i alın
```

`.env` dosyasına ekleyin:

```bash
AWS_ACCESS_KEY_ID=YOUR_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=eu-west-1
```

### 3. Backend Dependencies Yükleyin

```bash
cd backend
npm install
```

### 4. Backend Test Edin

```bash
npm run dev
# http://localhost:3000/health ziyaret edin
```

---

## 📱 Mobil Kurulum

### Flutter Kurulumu

```bash
# Flutter SDK kontrol edin
flutter doctor

# Eksik bağımlılıkları kurun
flutter doctor --android-licenses  # Android

# iOS pods güncelleyin (macOS)
cd mobile/ios
pod repo update
pod install
cd ../..
```

### Android Kurulumu

```bash
# Android Studio'da Virtual Device oluşturun
# Veya gerçek cihazı USB ile bağlayın

cd mobile
flutter pub get
flutter run -d android
```

### iOS Kurulumu (macOS)

```bash
cd mobile
flutter pub get
flutter run -d ios

# Veya Xcode'da açın
open ios/Runner.xcworkspace
```

---

## 🌐 Web Kurulumu

### 1. Dependencies Yükleyin

```bash
cd web
npm install
```

### 2. Environment Dosyasını Konfigüre Edin

```bash
# .env.local dosyasını düzenleyin
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Development Sunucusunu Başlatın

```bash
npm run dev
# http://localhost:3001 ziyaret edin
```

---

## ▶️ Çalıştırma

### Option 1: Docker Compose (Önerilen)

```bash
# Root dizinde
docker-compose up -d

# Services kontrol edin
docker-compose ps

# Logs görüntüleyin
docker-compose logs -f

# Durdurmak için
docker-compose down
```

**Endpoints:**
- Backend: http://localhost:3000
- Web: http://localhost:3001
- Database: localhost:5432
- Redis: localhost:6379

### Option 2: Manuel Çalıştırma

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Web:**
```bash
cd web
npm run dev
```

**Terminal 3 - Mobile (opsiyonel):**
```bash
cd mobile
flutter run
```

### Option 3: Monorepo (NX)

```bash
npx nx serve backend
npx nx serve web
```

---

## 🧪 Test Etme

### Backend Tests

```bash
cd backend
npm test
```

### Mobile Tests

```bash
cd mobile
flutter test
```

### Web Tests

```bash
cd web
npm test
```

---

## 🌍 Deployment

### Backend - Heroku

```bash
heroku create maranotter-api
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_url
git push heroku main
```

### Web - Vercel

```bash
npm i -g vercel
vercel
```

### Mobile - App Stores

Detaylar için [DEPLOYMENT.md](./DEPLOYMENT.md) bakın.

---

## 🆘 Troubleshooting

### "Cannot find module" Error

```bash
# Dependencies'leri yeniden yükleyin
npm install

# Cache temizleyin
npm cache clean --force
```

### Port Already in Use

```bash
# Kullanan process'i bulun (macOS/Linux)
lsof -i :3000

# Process'i kill edin
kill -9 PID
```

### Flutter Build Error

```bash
flutter clean
flutter pub get
flutter run
```

### Database Connection Error

1. Supabase connection string'i kontrol edin
2. Network access'ı kontrol edin
3. Environment variables'ı kontrol edin

---

## 📚 Ek Kaynaklar

- [Flutter Docs](https://flutter.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com)
- [Supabase Docs](https://supabase.io/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

## 💬 Destek

Sorularınız veya sorunlarınız varsa:
1. GitHub Issues'da bir issue açın
2. Discussions'da soru sorun
3. Email ile iletişime geçin

**Last Updated:** 2026-06-26
