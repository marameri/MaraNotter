# MaraNotter - Mimari Belgesi

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Clients                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   iOS App    │  │ Android App  │  │  Web App     │     │
│  │ (Flutter)    │  │ (Flutter)    │  │ (Next.js)    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │ (HTTPS/WebSocket)
         ┌───────────────────▼───────────────────┐
         │     API Gateway / Load Balancer      │
         │          (Nginx/CloudFront)          │
         └───────────────────┬───────────────────┘
                             │
         ┌───────────────────▼───────────────────┐
         │         Backend API Server           │
         │         (Express.js + Node.js)       │
         │                                       │
         │  ┌─────────────────────────────────┐ │
         │  │   Authentication & Routes       │ │
         │  │   - Auth routes                 │ │
         │  │   - Recording routes            │ │
         │  │   - Transcription routes        │ │
         │  │   - User routes                 │ │
         │  └─────────────────────────────────┘ │
         │                                       │
         │  ┌─────────────────────────────────┐ │
         │  │   Business Logic Services       │ │
         │  │   - OpenAI Service              │ │
         │  │   - S3 Service                  │ │
         │  │   - Supabase Service            │ │
         │  └─────────────────────────────────┘ │
         └──────────────┬─────────┬──────────────┘
                        │         │
      ┌─────────────────▼─┐   ┌──▼────────────────┐
      │   Supabase        │   │   AWS S3          │
      │   (Database)      │   │   (Audio Storage) │
      │                   │   │                   │
      │ ┌───────────────┐ │   │ ┌──────────────┐ │
      │ │ PostgreSQL    │ │   │ │ Recordings   │ │
      │ │ Tables        │ │   │ │ (Public)     │ │
      │ │ - users       │ │   │ │              │ │
      │ │ - recordings  │ │   │ │ Lifecycle:   │ │
      │ │ - transcripts │ │   │ │ 30 days      │ │
      │ │ - summaries   │ │   │ │              │ │
      │ │ - mindmaps    │ │   │ └──────────────┘ │
      │ └───────────────┘ │   │                   │
      │                   │   │                   │
      │ ┌───────────────┐ │   └───────────────────┘
      │ │ Auth Tables   │ │
      │ │ - users       │ │      ┌──────────────────────┐
      │ │ - sessions    │ │      │   External APIs      │
      │ └───────────────┘ │      │                      │
      │                   │      │ ┌────────────────┐  │
      │ ┌───────────────┐ │      │ │  OpenAI API    │  │
      │ │ Storage       │ │      │ │ - Whisper      │  │
      │ │ - recordings  │ │      │ │ - GPT-4o       │  │
      │ │ - avatars     │ │      │ └────────────────┘  │
      │ └───────────────┘ │      │                      │
      │                   │      │ ┌────────────────┐  │
      │ RLS Enabled       │      │ │ Stripe API     │  │
      │ Automated Backups │      │ │ (Subscription) │  │
      │ Real-time updates │      │ └────────────────┘  │
      └───────────────────┘      │                      │
                                 │ ┌────────────────┐  │
                                 │ │ Email Service  │  │
                                 │ │ (SendGrid)     │  │
                                 │ └────────────────┘  │
                                 └──────────────────────┘
```

## Data Flow

### Recording Creation Flow
```
1. Mobile/Web App
   └─> Record Audio (local file)
       └─> Upload to S3 via Backend
           └─> Create Recording in DB
               └─> Return recording_id to client
```

### Transcription Flow
```
1. User triggers transcription
   └─> Backend receives request
       └─> Fetch audio from S3
           └─> Send to OpenAI Whisper
               └─> Get transcript text
                   └─> Save to DB
                       └─> Emit WebSocket event
                           └─> Update client UI
```

### Summary Generation Flow
```
1. User requests summary
   └─> Backend gets transcript from DB
       └─> Send to GPT-4o API
           └─> Extract action items & decisions
               └─> Save summary to DB
                   └─> Send response to client
```

## Security Architecture

### Authentication
```
1. User registers/logs in
   └─> Supabase Auth (JWT)
       └─> Token stored in localStorage/keychain
           └─> Included in Authorization header
               └─> Backend verifies JWT
                   └─> Grant access to resources
```

### Authorization (RLS)
```
PostgreSQL Row Level Security Policies:
- users: Users can only see own profile
- recordings: Users can only see own recordings (+ public)
- transcripts: Access through recording ownership
- Similar for summaries, mindmaps, folders, tags
```

### Data Encryption
```
- HTTPS/TLS in transit
- Data encrypted at rest (Supabase default)
- Sensitive data: passwords, API keys, tokens
- S3 bucket: private with signed URLs
```

## Scalability Considerations

### Database
- Connection pooling (PgBouncer)
- Read replicas for scaling
- Partitioning large tables (recordings by date)
- Regular VACUUM & ANALYZE

### API Server
- Horizontal scaling (load balancer)
- Stateless design (no server sessions)
- WebSocket namespace (socket.io adapters)
- Rate limiting & throttling

### Storage
- S3 lifecycle policies (transition to Glacier)
- CloudFront CDN for recordings
- Multipart upload for large files
- Presigned URLs for secure access

### External APIs
- Request caching (Redis)
- Batch processing
- Retry logic with exponential backoff
- Error handling & fallbacks

## Monitoring & Logging

### Metrics
- API response times
- Database query performance
- Error rates
- User activity
- File upload/download speeds

### Logging
- Application logs (Winston/Bunyan)
- Database logs (PostgreSQL)
- API request logs
- Error tracking (Sentry)
- User audit trail

### Alerts
- High error rate
- Slow queries
- Disk space
- Database connection issues
- API quota exceeded

## Deployment Architecture

### Development
- Docker Compose locally
- Hot reload enabled
- Mock external services (optional)

### Staging
- Heroku/Railway
- Real external services
- Production data (anonymized)
- Load testing

### Production
- Multi-region deployment
- Auto-scaling groups
- Database replication
- Backup strategy
- CDN for assets
- DNS failover

## Technology Decisions

### Why Supabase?
- PostgreSQL reliability
- Built-in Auth & Storage
- Real-time subscriptions
- RLS for security
- Easy migrations
- Free tier for development

### Why OpenAI API?
- Best quality transcription (Whisper)
- Powerful LLM (GPT-4o)
- Easy API integration
- Good documentation

### Why Flutter?
- Single codebase (iOS + Android)
- Great performance
- Rich widget library
- Hot reload
- Native integration (AVFoundation)

### Why Next.js?
- Full-stack React framework
- Server-side rendering
- API routes built-in
- Optimized for performance
- Great for SEO

---

**Last Updated:** 2026-06-26
