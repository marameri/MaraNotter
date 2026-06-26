# 🎯 MaraNotter - Geliştirme Rehberi

## Dosya Yapısı Açıklaması

### Backend (`/backend`)

```
backend/
├── src/
│   ├── app.ts                    # Express uygulamasının ana giriş noktası
│   ├── routes/                   # API rotaları
│   │   ├── auth.routes.ts        # Kimlik doğrulama (login, register)
│   │   ├── recordings.routes.ts  # Ses kayıtları CRUD
│   │   ├── transcription.routes.ts # Transkripsiyon, özet, mind map
│   │   └── user.routes.ts        # Kullanıcı profili
│   ├── controllers/              # Business logic (henüz uygulanmadı)
│   ├── services/
│   │   ├── supabaseService.ts    # Supabase client
│   │   ├── openaiService.ts      # OpenAI API (Whisper, GPT-4)
│   │   └── s3Service.ts          # AWS S3 dosya yükleme
│   └── middleware/
│       ├── auth.ts               # JWT authentication
│       └── errorHandler.ts       # Error handling
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env.example
```

**API Endpoints:**
```
POST   /api/auth/register         # Kayıt
POST   /api/auth/login            # Giriş
POST   /api/auth/logout           # Çıkış
GET    /health                    # Health check

POST   /api/recordings            # Yeni kayıt oluştur
GET    /api/recordings            # Tüm kayıtları getir
GET    /api/recordings/:id        # Spesifik kaydı getir
DELETE /api/recordings/:id        # Kaydı sil

POST   /api/transcription/transcribe/:id  # Transkripsiyon başlat
GET    /api/transcription/:id             # Transkript al
POST   /api/transcription/summary/:id     # Özet oluştur
POST   /api/transcription/mindmap/:id     # Mind map oluştur

GET    /api/user/profile          # Profil bilgisi
PUT    /api/user/profile          # Profil güncelle
```

### Mobile (`/mobile`)

```
mobile/
├── lib/
│   ├── main.dart                 # Uygulama ana giriş
│   ├── screens/
│   │   ├── splash_screen.dart    # Açılış ekranı
│   │   ├── home_screen.dart      # Ana sayfa
│   │   ├── recording_screen.dart # Kayıt ekranı
│   │   ├── playback_screen.dart  # Oynatma (henüz uygulanmadı)
│   │   ├── transcript_screen.dart# Transkript ekranı (henüz uygulanmadı)
│   │   └── profile_screen.dart   # Profil ekranı (henüz uygulanmadı)
│   ├── controllers/              # GetX state management
│   │   ├── home_controller.dart  # Ana sayfa lojiki
│   │   ├── recording_controller.dart # Kayıt lojiki
│   │   └── auth_controller.dart  # Auth lojiki (henüz uygulanmadı)
│   ├── services/
│   │   ├── audio_service.dart    # Ses kaydı servisi (henüz uygulanmadı)
│   │   ├── api_service.dart      # Backend API çağrıları (henüz uygulanmadı)
│   │   └── storage_service.dart  # Lokal depolama (henüz uygulanmadı)
│   ├── models/
│   │   ├── recording.dart        # Recording data model (henüz uygulanmadı)
│   │   ├── transcript.dart       # Transcript model (henüz uygulanmadı)
│   │   └── user.dart             # User model (henüz uygulanmadı)
│   └── widgets/
│       ├── recording_button.dart # Animasyonlu kayıt butonu
│       ├── waveform_painter.dart # Gerçek zamanlı dalga formu
│       └── audio_player.dart     # Ses oynatıcı (henüz uygulanmadı)
├── pubspec.yaml                  # Dart dependencies
└── README.md
```

**Screens Açıklaması:**
- **Splash Screen:** Açılış animasyonu
- **Home Screen:** Son kayıtlar, hızlı aksiyon butonları
- **Recording Screen:** Tek dokunuşla kayıt, waveform gösterimi
- **Playback Screen:** Ses oynatıcı + transkript
- **Transcript Screen:** Transkript, özet, mind map tabları
- **Profile Screen:** Kullanıcı profili ve ayarlar

### Web (`/web`)

```
web/
├── app/
│   ├── page.tsx                  # Ana sayfa (giriş)
│   ├── layout.tsx                # Global layout
│   ├── (auth)/
│   │   ├── login/page.tsx        # Giriş sayfası
│   │   └── register/page.tsx     # Kayıt sayfası
│   ├── (dashboard)/
│   │   ├── page.tsx              # Dashboard
│   │   ├── recordings/page.tsx   # Kayıtlar listesi
│   │   └── profile/page.tsx      # Profil (henüz uygulanmadı)
│   └── globals.css               # Global stiller
├── components/
│   ├── Navbar.tsx                # Navigasyon barı
│   ├── LoginForm.tsx             # Login formu
│   ├── RegisterForm.tsx          # Register formu
│   ├── RecordingList.tsx         # Kayıtlar listesi
│   └── Player.tsx                # Ses oynatıcı (henüz uygulanmadı)
├── services/
│   ├── api.ts                    # API istemcisi (henüz uygulanmadı)
│   └── auth.ts                   # Auth servisi (henüz uygulanmadı)
├── package.json
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json
└── README.md
```

**Pages Açıklaması:**
- `/` - Ana sayfa (marketing)
- `/auth/login` - Giriş
- `/auth/register` - Kayıt
- `/dashboard` - Dashboard (protected)
- `/recordings` - Kayıtlar listesi
- `/recordings/[id]` - Kayıt detayı
- `/profile` - Profil (protected)

### Database (`/database`)

```
database/
├── migrations/
│   ├── 001_initial_schema.sql    # Ana tablo yapısı
│   ├── 002_row_level_security.sql # RLS politikaları
│   ├── 003_soft_delete.sql       # Çöp kutusu özelliği
│   └── 004_audit_logging.sql     # Audit loglama
└── README.md                      # Database rehberi
```

---

## Development Workflow

### 1. Yeni Feature Eklemek

```bash
# Feature branch oluşturun
git checkout -b feature/new-feature

# Kodunuzu yazın
# Testleri yazın
# Commit edin
git add .
git commit -m "feat: add new feature"

# Push edin
git push origin feature/new-feature

# Pull Request açın
```

### 2. Code Standards

- **TypeScript:** Strict mode etkinleştirildi
- **Naming Convention:** camelCase (variables), PascalCase (components)
- **Formatting:** Prettier kullanın
- **Linting:** ESLint yapılandırması mevcut

```bash
# Backend linting
cd backend && npm run lint

# Web linting
cd web && npm run lint
```

### 3. Commit Mesajları

```
feat: yeni feature açıklaması
fix: bug düzeltmesi
docs: dokümantasyon
style: kod formatı
refactor: kod yapısı değişikliği
test: test ekleme
chore: dependecy güncelleme
```

---

## State Management

### Mobile (Flutter/GetX)

```dart
// Controller oluşturma
class RecordingController extends GetxController {
  final isRecording = false.obs;
  
  void toggleRecording() {
    isRecording.toggle();
    update();
  }
}

// Widget'ta kullanma
class RecordingWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Obx(() => CircleAvatar(
      // reactive
    ));
  }
}
```

### Web (Next.js/Zustand)

```typescript
// Store oluşturma
import create from 'zustand';

const useRecordingStore = create((set) => ({
  recordings: [],
  addRecording: (recording) => set((state) => ({
    recordings: [...state.recordings, recording],
  })),
}));

// Component'te kullanma
function RecordingList() {
  const recordings = useRecordingStore((state) => state.recordings);
  // ...
}
```

---

## API Integration

### Backend ile İletişim

**Mobile (Dio):**
```dart
final dio = Dio();
final response = await dio.post(
  'http://localhost:3000/api/recordings',
  options: Options(
    headers: {'Authorization': 'Bearer $token'},
  ),
  data: formData,
);
```

**Web (Axios/SWR):**
```typescript
const fetcher = (url: string) => 
  fetch(url, {
    headers: {'Authorization': `Bearer ${token}`}
  }).then(r => r.json())

const { data } = useSWR('/api/recordings', fetcher);
```

---

## Performance Optimization

### Mobile
- GetX lazy initialization
- Image caching
- Waveform sampling (her 100ms)
- Background isolate kullanma

### Web
- Image optimization (Next Image)
- Code splitting
- Lazy loading components
- SWR caching

### Backend
- Database indexing
- Query optimization
- WebSocket real-time updates
- Redis caching (opsiyonel)

---

## Testing

### Backend (Jest)
```bash
cd backend
npm test
npm run test:coverage
```

### Mobile (Flutter)
```bash
cd mobile
flutter test
```

### Web (Jest/React Testing Library)
```bash
cd web
npm test
```

---

## Git Workflow

```
main (production)
  ↓
dev (staging)
  ↓
feature/* (development)
```

1. `feature/*` branchtan `dev`'e PR açın
2. Code review
3. Merge
4. `dev`'den `main`'e release PR
5. Production deployment

---

## Debugging

### Backend
```bash
# Debug mode
node --inspect-brk dist/app.js

# Chrome DevTools
chrome://inspect
```

### Mobile
```bash
# Debug mode
flutter run --verbose

# Hot reload
flutter run
# Press 'r' for hot reload
# Press 'R' for hot restart
```

### Web
```bash
# Developer Tools
F12
# Network, Console, Debugger tabs
```

---

## Useful Links

- [Dart Style Guide](https://dart.dev/guides/language/effective-dart/style)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Next.js Best Practices](https://nextjs.org/docs/advanced-features/measuring-performance)
- [REST API Best Practices](https://restfulapi.net/)

**Last Updated:** 2026-06-26
