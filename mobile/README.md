# Flutter App - MaraNotter

AI-Powered audio recording and note-taking Flutter application.

## Getting Started

### Prerequisites
- Flutter SDK 3.10+
- Dart 3.0+
- iOS 14.0+ / Android 8.0+

### Setup

1. Get dependencies:
```bash
flutter pub get
```

2. Run the app:
```bash
flutter run
```

3. Build for iOS:
```bash
flutter build ios
```

4. Build for Android:
```bash
flutter build apk
# or
flutter build appbundle
```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── screens/                  # UI Screens
│   ├── splash_screen.dart
│   ├── home_screen.dart
│   ├── recording_screen.dart
│   ├── playback_screen.dart
│   ├── transcript_screen.dart
│   └── profile_screen.dart
├── controllers/              # State Management (GetX)
│   ├── home_controller.dart
│   ├── recording_controller.dart
│   └── auth_controller.dart
├── services/                 # API & Business Logic
│   ├── api_service.dart
│   ├── audio_service.dart
│   └── storage_service.dart
├── models/                   # Data Models
│   ├── recording.dart
│   ├── transcript.dart
│   └── user.dart
└── widgets/                  # Reusable Widgets
    ├── recording_button.dart
    ├── waveform_painter.dart
    └── audio_player.dart
```

## Features

- 🎙️ One-tap recording
- 📊 Real-time waveform display
- 🔄 Background audio support
- 🤖 AI transcription (Whisper API)
- 📝 Auto-generated summaries
- 🗺️ Mind maps
- 👤 Speaker diarization
- 💾 Secure storage
- 🌙 Dark mode support

## Testing

```bash
flutter test
```

## Performance

Target metrics:
- App startup: < 2s
- Recording start: < 500ms
- UI frame rate: 60 FPS

**Last Updated:** 2026-06-26
