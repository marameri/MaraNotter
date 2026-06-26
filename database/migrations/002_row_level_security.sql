-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mindmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "users_can_read_own_profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "users_can_update_own_profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Users can read their own recordings
CREATE POLICY "users_can_read_own_recordings"
  ON recordings FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

-- Users can create recordings
CREATE POLICY "users_can_create_recordings"
  ON recordings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own recordings
CREATE POLICY "users_can_update_own_recordings"
  ON recordings FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own recordings
CREATE POLICY "users_can_delete_own_recordings"
  ON recordings FOR DELETE
  USING (auth.uid() = user_id);

-- Users can read transcripts of their recordings
CREATE POLICY "users_can_read_own_transcripts"
  ON transcripts FOR SELECT
  USING (recording_id IN (SELECT id FROM recordings WHERE user_id = auth.uid()));

-- Similar policies for summaries and mindmaps
CREATE POLICY "users_can_read_own_summaries"
  ON summaries FOR SELECT
  USING (recording_id IN (SELECT id FROM recordings WHERE user_id = auth.uid()));

CREATE POLICY "users_can_read_own_mindmaps"
  ON mindmaps FOR SELECT
  USING (recording_id IN (SELECT id FROM recordings WHERE user_id = auth.uid()));

-- Users can read their own folders
CREATE POLICY "users_can_read_own_folders"
  ON folders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can manage their own folders
CREATE POLICY "users_can_manage_own_folders"
  ON folders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own tags
CREATE POLICY "users_can_read_own_tags"
  ON tags FOR SELECT
  USING (auth.uid() = user_id);

-- Users can manage their own tags
CREATE POLICY "users_can_manage_own_tags"
  ON tags FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can manage their own favorites
CREATE POLICY "users_can_manage_own_favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- Users can read their subscriptions
CREATE POLICY "users_can_read_own_subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
