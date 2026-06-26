# 🎙️ MaraNotter - AI Ses Kaydı & Not Alma Uygulaması

**MaraNotter**, yapay zeka tarafından desteklenen, çoklu platform ses kaydı ve akıllı not alma uygulamasıdır.

## 🚀 Özellikler

### ✨ Temel Özellikleri
- ✅ Tek dokunuşla ses kaydı (one-tap recording)
- ✅ Gerçek zamanlı dalga formu (waveform)
- ✅ AI Transkripsiyon (Speech-to-Text)
- ✅ Konuşmacı Tanımlama (Speaker Diarization)
- ✅ Otomatik Özet & Analiz
- ✅ Zihin Haritası (Mind Map)
- ✅ Dosya Yükleme (MP3, WAV, M4A, PDF, Resim)
- ✅ YouTube Entegrasyonu
- ✅ Takvim Bağlantısı (Google/Apple Calendar)
- ✅ Not Organizasyonu (Klasörler, Etiketler, Favoriler)
- ✅ Takım Çalışma Alanı (Team Workspace)
- ✅ E-posta Oluşturma
- ✅ Enterprise Şifreleme
- ✅ Abonelik Sistemi

## 🛠️ Teknoloji Stack

### Mobil (iOS & Android)
- **Flutter** 3.x
- **Dart**
- **GetX** (State Management)
- **audio_session** (Arka plan ses)
- **speech_to_text** (Transkripsiyon)

### Web
- **Next.js** 14
- **React** 18
- **TypeScript**
- **Tailwind CSS**
- **SWR** (Data Fetching)

### Backend
- **Node.js** 20
- **Express.js**
- **TypeScript**
- **PostgreSQL** (Supabase)
- **WebSocket** (Real-time)
- **OpenAI Whisper** (Transkripsiyon)
- **OpenAI GPT-4o** (Özet & Analiz)

### Altyapı
- **Supabase** (Database + Auth + Storage)
- **AWS S3** (Ses Dosyaları)
- **Docker** (Development)
- **Stripe/RevenueCat** (Abonelik)

## 📁 Proje Yapısı

```
MaraNotter/
├── mobile/           # Flutter App (iOS & Android)
├── web/              # Next.js Web App
├── backend/          # Node.js API Server
├── database/         # PostgreSQL Schemas
├── docker-compose.yml
├── .env.example
├── README.md
├── PROJECT_PLAN.md
└── DEPLOYMENT.md
```

## 🎯 MVP Özellikleri (Faz 1)

1. ✅ Ses Kaydı (iOS/Android/Web)
2. ✅ Whisper API ile Transkripsiyon
3. ✅ GPT-4o ile Özet
4. ✅ Kayıtları Listele & Oynat
5. ✅ Temel Not Organizasyonu
6. ✅ Kullanıcı Girişi & Profili

## 📖 Kurulum

### Ön Gereksinimler
- Flutter SDK 3.x
- Node.js 20+
- PostgreSQL 14+
- Docker & Docker Compose

### Mobil Geliştirme

```bash
cd mobile
flutter pub get
flutter run
```

### Web Geliştirme

```bash
cd web
npm install
npm run dev
```

### Backend Geliştirme

```bash
cd backend
npm install
npm run dev
```

### Docker ile Lokal Setup

```bash
docker-compose up -d
```

## 🔑 Ortam Değişkenleri

`.env.example` dosyasını kopyalayıp `.env` oluşturun:

```bash
cp .env.example .env
```

Gerekli değişkenleri doldurun:
- Supabase URL & Key
- OpenAI API Key
- AWS S3 Credentials
- Stripe/RevenueCat Keys

## 📚 Dokümantasyon

- [Detaylı Proje Planı](PROJECT_PLAN.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Dokümantasyonu](backend/API.md)
- [Flutter Widget Rehberi](mobile/WIDGETS.md)

## 🤝 Katkı

Katkıda bulunmak isterseniz:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

- **Marameri** - [@marameri](https://github.com/marameri)

## 📧 İletişim

Sorular veya öneriler için issue açabilirsiniz.

---

**Son güncelleme:** 2026-06-26
