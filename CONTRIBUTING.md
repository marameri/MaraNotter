# MaraNotter - Katkı Rehberi

## Kod Katkısında Bulunmak

### 1. Fork ve Clone
```bash
git clone https://github.com/your-username/MaraNotter.git
cd MaraNotter
git remote add upstream https://github.com/marameri/MaraNotter.git
```

### 2. Branch Oluşturun
```bash
git checkout -b feature/amazing-feature
```

### 3. Değişiklikler Yapın
- Kod yazın
- Testler ekleyin
- Dokümantasyon güncelleyin

### 4. Commit ve Push
```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### 5. Pull Request Açın
- GitHub'da PR oluşturun
- Açıklama yazın
- İlgili issue'yu referans gösterin

## PR Requirements

- ✅ TypeScript strict mode
- ✅ Tests pass
- ✅ No linting errors
- ✅ Documentation updated
- ✅ Commit messages follow conventions

## Code Review Process

1. At least 2 approvals required
2. CI/CD checks pass
3. No merge conflicts
4. Squash commits before merge

## Issue Report

Bug bulunca:
1. Title: "[BUG] Açıklama"
2. Description: Detaylı açıklama
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots/logs
6. Environment info

## Feature Request

Yeni feature önerileri:
1. Title: "[FEATURE] Açıklama"
2. Description: Detaylı açıklama
3. Use cases
4. Acceptance criteria
5. Related issues/PRs

## Lisans

MIT License - Detaylar için [LICENSE](LICENSE) bakın

**Last Updated:** 2026-06-26
