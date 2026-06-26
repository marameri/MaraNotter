# Web Dashboard - MaraNotter

Next.js 14 web dashboard for MaraNotter.

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Development
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── page.tsx
│   ├── recordings/page.tsx
│   ├── profile/page.tsx
│   └── settings/page.tsx
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── Navbar.tsx
├── LoginForm.tsx
├── RegisterForm.tsx
├── RecordingList.tsx
└── Player.tsx
```

## Features

- 🎨 Responsive Tailwind CSS design
- 🌓 Dark mode support
- 📱 Mobile-first approach
- ⚡ Next.js 14 with App Router
- 🔐 JWT authentication
- 📊 Real-time data with SWR
- 🎯 TypeScript support

## Performance

- Next Image optimization
- Code splitting
- Font optimization
- Lazy loading components

**Last Updated:** 2026-06-26
