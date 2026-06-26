# 🚀 Deployment Guide

## Backend Deployment

### Heroku

```bash
# Heroku CLI yükleme
brew tap heroku/brew && brew install heroku

# Giriş yapma
heroku login

# Uygulama oluşturma
heroku create maranotter-api

# Environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_supabase_url
heroku config:set OPENAI_API_KEY=your_key

# Deploy etme
git push heroku main
```

### AWS ECS

```bash
# ECR repository oluşturma
aws ecr create-repository --repository-name maranotter

# Docker image push
docker build -t maranotter:latest .
docker tag maranotter:latest YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/maranotter:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/maranotter:latest
```

## Mobile Deployment

### iOS App Store

1. Xcode'da signing setup
2. Build version arttırma
3. Archive oluşturma
4. TestFlight'a yükleme
5. App Store Review'a gönderme

### Android Google Play Store

1. Google Play Console'da proje oluşturma
2. Signed APK/AAB oluşturma
3. Play Store'a yükleme
4. Beta testing başlatma
5. Production'a yayınlama

## Web Deployment

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

```bash
npm run build
# out/ klasörü push edin
```

## Database Migration

```bash
# Supabase CLI yükleme
npm install -g supabase

# Migration oluşturma
supabase migration new initial_schema

# Push etme
supabase db push
```

## Monitoring

- **Sentry**: Error tracking
- **New Relic**: Performance monitoring
- **CloudWatch**: AWS logs
- **DataDog**: APM & Monitoring

## CI/CD Pipeline

GitHub Actions kullanarak otomatik deployment.

**Last Updated:** 2026-06-26
