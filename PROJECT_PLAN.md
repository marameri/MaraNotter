# 📋 MaraNotter - Detaylı Proje Planı

## 🎯 Proje Vizyonu

MaraNotter, yapay zeka tarafından güçlendirilen, kullanıcıların ses kayıtlarını otomatik olarak transkripsiyon, özet ve analiz yapabilen, çoklu platform (iOS, Android, Web) not alma uygulamasıdır.

## 📊 Faz Planı

### Faz 1: MVP (6 Hafta)
**Hedef:** Temel ses kaydı, transkripsiyon ve özet

#### 1.1 Backend Setup (1. Hafta)
- [ ] Node.js/Express server kurulumu
- [ ] PostgreSQL şema tasarımı
- [ ] Supabase entegrasyonu
- [ ] JWT Authentication
- [ ] OpenAI API bağlantısı

#### 1.2 Mobil Uygulama - Ses Kaydı (2. Hafta)
- [ ] Flutter projesi setup
- [ ] Audio recording UI
- [ ] Gerçek zamanlı waveform
- [ ] Arka plan ses desteği
- [ ] Kayıt süresi göstergesi

#### 1.3 Transkripsiyon & Özet (3. Hafta)
- [ ] OpenAI Whisper API entegrasyonu
- [ ] WebSocket real-time transkripsiyon
- [ ] GPT-4o özet oluşturma
- [ ] Veritabanı kaydı

#### 1.4 Mobil UI - Liste & Oynatma (4. Hafta)
- [ ] Kayıtlar listesi
- [ ] Audio player
- [ ] Detay ekranı (transkript + özet)
- [ ] Temel arama

#### 1.5 Web Dashboard (5. Hafta)
- [ ] Next.js setup
- [ ] Responsive design
- [ ] Kayıtlar sayfası
- [ ] Player ve transkript görünümü

#### 1.6 Authentication & Profil (6. Hafta)
- [ ] Supabase Auth (Email/Google)
- [ ] Profil ekranı
- [ ] Ayarlar
- [ ] Testing & Bug fixes

### Faz 2: Gelişmiş Özellikler (4 Hafta)

#### 2.1 Konuşmacı Tanımlama
- [ ] AssemblyAI/Deepgram entegrasyonu
- [ ] Speaker diarization
- [ ] Zaman damgalı transkript

#### 2.2 Mind Map & Analiz
- [ ] AI Mind Map oluşturma
- [ ] Action items çıkarma
- [ ] Karar analizi
- [ ] AI Chat interface

#### 2.3 Dosya Yükleme
- [ ] MP3/WAV/M4A yükleme
- [ ] PDF yükleme & OCR
- [ ] Resim yükleme
- [ ] YouTube transkripsiyon

### Faz 3: Takım & İşbirliği (3 Hafta)

#### 3.1 Team Workspace
- [ ] Workspace oluşturma
- [ ] Üye davet sistemi
- [ ] Rol ve izinler
- [ ] Shared notebooks

#### 3.2 Takvim Entegrasyonu
- [ ] Google Calendar bağlantı
- [ ] Apple Calendar bağlantı
- [ ] Otomatik toplantı katılma
- [ ] Post-meeting özet

#### 3.3 E-posta & Paylaşım
- [ ] Link paylaşımı
- [ ] E-posta özeti oluşturma
- [ ] OneNote sync

### Faz 4: Monetization & Deployment (2 Hafta)

#### 4.1 Abonelik Sistemi
- [ ] Stripe entegrasyonu
- [ ] RevenueCat (mobile)
- [ ] Paywall ekranı
- [ ] Abonelik yönetimi

#### 4.2 Deployment
- [ ] iOS App Store
- [ ] Google Play Store
- [ ] Web hosting
- [ ] CI/CD pipeline

---

## 🏗️ Teknoloji Detayları

### Backend API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

POST   /api/recordings
GET    /api/recordings
GET    /api/recordings/:id
DELETE /api/recordings/:id

POST   /api/recordings/:id/transcribe
GET    /api/recordings/:id/transcript

POST   /api/recordings/:id/summarize
GET    /api/recordings/:id/summary

POST   /api/recordings/:id/mindmap
GET    /api/recordings/:id/mindmap

GET    /api/user/profile
PUT    /api/user/profile
```

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  avatar_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recordings
CREATE TABLE recordings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR,
  description TEXT,
  audio_url VARCHAR NOT NULL,
  duration INTEGER,
  file_size INTEGER,
  language VARCHAR DEFAULT 'tr',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transcripts
CREATE TABLE transcripts (
  id UUID PRIMARY KEY,
  recording_id UUID REFERENCES recordings(id),
  content TEXT NOT NULL,
  speakers JSONB,
  timestamps JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Summaries
CREATE TABLE summaries (
  id UUID PRIMARY KEY,
  recording_id UUID REFERENCES recordings(id),
  content TEXT NOT NULL,
  action_items JSONB,
  decisions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mind Maps
CREATE TABLE mindmaps (
  id UUID PRIMARY KEY,
  recording_id UUID REFERENCES recordings(id),
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Dosya Yapısı Detayları

#### Backend
```
backend/
├── src/
│   ├── api/
│   │   ├── auth.routes.ts
│   │   ├── recordings.routes.ts
│   │   ├── transcription.routes.ts
│   │   └── user.routes.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── recordingController.ts
│   │   └── transcriptionController.ts
│   ├── services/
│   │   ├── openaiService.ts
│   │   ├── supabaseService.ts
│   │   ├── s3Service.ts
│   │   └── transcriptionService.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Recording.ts
│   │   └── Transcript.ts
│   └── app.ts
├── .env.example
├── docker-compose.yml
├── tsconfig.json
└── package.json
```

#### Mobile (Flutter)
```
mobile/
├── lib/
│   ├── screens/
│   │   ├── splash_screen.dart
│   │   ├── home_screen.dart
│   │   ├── recording_screen.dart
│   │   ├── playback_screen.dart
│   │   ├── transcript_screen.dart
│   │   ├── summary_screen.dart
│   │   └── profile_screen.dart
│   ├── widgets/
│   │   ├── recording_button.dart
│   │   ├── waveform_painter.dart
│   │   ├── audio_player.dart
│   │   └── transcript_view.dart
│   ├── services/
│   │   ├── audio_service.dart
│   │   ├── api_service.dart
│   │   └── storage_service.dart
│   ├── models/
│   │   ├── recording.dart
│   │   ├── transcript.dart
│   │   └── user.dart
│   ├── providers/
│   │   ├── recording_provider.dart
│   │   └── user_provider.dart
│   └── main.dart
├── pubspec.yaml
└── README.md
```

#### Web (Next.js)
```
web/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx
│   │   ├── recordings/page.tsx
│   │   ├── recordings/[id]/page.tsx
│   │   └── profile/page.tsx
│   └── api/
│       ├── auth/route.ts
│       └── recordings/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── RecordingList.tsx
│   ├── Player.tsx
│   └── TranscriptView.tsx
├── services/
│   ├── api.ts
│   └── auth.ts
├── public/
└── package.json
```

---

## 🔒 Güvenlik

- [ ] End-to-End Encryption (E2EE)
- [ ] Rate limiting
- [ ] CORS yapılandırması
- [ ] SQL injection koruması
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] API key rotation

---

## 📈 Performance Hedefleri

- Recording başlama: < 500ms
- Transkripsiyon başlatma: < 2s
- Özet üretme: < 10s
- API response: < 200ms
- Mobile app startup: < 2s
- Web page load: < 1s

---

## 🧪 Testing Stratejisi

- Unit tests: 80% code coverage
- Integration tests: API endpoints
- E2E tests: Critical user flows
- Performance testing: Load testing
- Security testing: OWASP top 10

---

## 📱 Platform Gereksinimleri

### iOS
- Minimum: iOS 14.0
- Target: iOS 17+
- Frameworks: AVFoundation, EventKit

### Android
- Minimum: Android 8.0 (API 26)
- Target: Android 14 (API 34)
- Permissions: RECORD_AUDIO, READ_CALENDAR

### Web
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

---

## 📅 Timeline

- **Hafta 1-6:** Faz 1 (MVP)
- **Hafta 7-10:** Faz 2 (Advanced Features)
- **Hafta 11-13:** Faz 3 (Team & Collaboration)
- **Hafta 14-15:** Faz 4 (Monetization & Deployment)
- **Sonrası:** Maintenance & Iterations

---

## 🎯 KPIs

- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Churn rate
- Conversion rate (Free → Paid)
- Average session duration
- Recording accuracy rate
- API uptime (99.9%)

---

**Last Updated:** 2026-06-26
