-- Recycle Bin / Soft Delete Support
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;

-- View for non-deleted recordings
CREATE OR REPLACE VIEW active_recordings AS
SELECT * FROM recordings WHERE deleted_at IS NULL;

-- View for deleted recordings (trash)
CREATE OR REPLACE VIEW deleted_recordings AS
SELECT * FROM recordings WHERE deleted_at IS NOT NULL;

-- Function to soft delete a recording
CREATE OR REPLACE FUNCTION soft_delete_recording(recording_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE recordings SET deleted_at = CURRENT_TIMESTAMP WHERE id = recording_id;
END;
$$ LANGUAGE plpgsql;

-- Function to restore a recording from trash
CREATE OR REPLACE FUNCTION restore_recording(recording_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE recordings SET deleted_at = NULL WHERE id = recording_id;
END;
$$ LANGUAGE plpgsql;

-- Function to permanently delete old deleted recordings (30 days)
CREATE OR REPLACE FUNCTION permanently_delete_old_recordings()
RETURNS void AS $$
BEGIN
  DELETE FROM recordings WHERE deleted_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;
