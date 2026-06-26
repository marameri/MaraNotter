# Database Setup Guide

## Supabase Configuration

1. **Create a Supabase Project**
   - Go to https://supabase.io
   - Create a new project
   - Wait for the database to initialize

2. **Run Migrations**
   - Go to SQL Editor
   - Copy and paste the contents of `001_initial_schema.sql`
   - Execute the SQL
   - Then run `002_row_level_security.sql`

3. **Environment Variables**
   Update your `.env` file:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Enable Storage**
   - Go to Storage → Create a new bucket
   - Name: `recordings`
   - Set to Private
   - Configure policies for authenticated access

5. **Authentication Setup**
   - Go to Authentication → Providers
   - Enable Email/Password authentication
   - Enable Google OAuth (optional)
   - Enable GitHub OAuth (optional)

## Database Schema Overview

### Core Tables
- **users** - User accounts and profiles
- **recordings** - Audio recordings metadata
- **transcripts** - Transcribed text from audio
- **summaries** - AI-generated summaries
- **mindmaps** - AI-generated mind maps

### Organization Tables
- **folders** - Folder hierarchy
- **tags** - Recording tags
- **recording_tags** - Many-to-many relationship
- **favorites** - User favorites

### Collaboration Tables
- **workspaces** - Team workspaces
- **workspace_members** - Workspace members and roles
- **workspace_recordings** - Shared recordings

### Billing Tables
- **subscriptions** - User subscription information

## Row Level Security (RLS)

All tables have RLS enabled to ensure data privacy:
- Users can only see/modify their own data
- Public recordings can be viewed by anyone
- Workspace members can view shared recordings

## Backup Strategy

Supabase provides automated daily backups. To manually backup:

```bash
# Export database
pg_dump --clean --if-exists --quote-all-identifiers \
  -h your-project.supabase.co \
  -U postgres \
  your_database > backup.sql
```

## Performance Optimization

- Indexes are created on frequently queried columns
- JSONB columns used for flexible data (speakers, timestamps, action_items)
- Soft deletes implemented (deleted_at column)

**Last Updated:** 2026-06-26
