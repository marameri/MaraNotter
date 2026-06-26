import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { supabase } from '../services/supabaseService';
import { transcribeAudio, generateSummary, generateMindMap } from '../services/openaiService';
import { v4 as uuidv4 } from 'uuid';
import { io } from '../app';

const router = Router();

interface AuthRequest extends Request {
  user?: { id: string; email: string };
  body: {
    recording_id: string;
  };
}

// Transcribe audio
router.post(
  '/transcribe/:recording_id',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const { recording_id } = req.params;

      // Get recording
      const { data: recording, error: recordingError } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', recording_id)
        .eq('user_id', req.user?.id)
        .single();

      if (recordingError) {
        return res.status(404).json({ error: 'Recording not found' });
      }

      // Emit progress
      io.emit('transcription_progress', {
        recording_id,
        status: 'transcribing',
      });

      // Transcribe
      const transcript = await transcribeAudio(recording.audio_url);

      // Save transcript
      const transcriptRecord = {
        id: uuidv4(),
        recording_id,
        content: transcript,
        speakers: null,
        timestamps: null,
        created_at: new Date(),
      };

      const { error: saveError } = await supabase
        .from('transcripts')
        .insert([transcriptRecord]);

      if (saveError) {
        return res.status(400).json({ error: saveError.message });
      }

      // Emit completion
      io.emit('transcription_progress', {
        recording_id,
        status: 'completed',
      });

      res.json({ transcript: transcriptRecord });
    } catch (error: any) {
      io.emit('transcription_progress', {
        recording_id: req.params.recording_id,
        status: 'error',
        error: error.message,
      });
      res.status(500).json({ error: error.message });
    }
  }
);

// Get transcript
router.get('/:recording_id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    // Verify ownership
    const { error: recordingError } = await supabase
      .from('recordings')
      .select('*')
      .eq('id', req.params.recording_id)
      .eq('user_id', req.user?.id)
      .single();

    if (recordingError) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    // Get transcript
    const { data, error } = await supabase
      .from('transcripts')
      .select('*')
      .eq('recording_id', req.params.recording_id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Transcript not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate summary
router.post(
  '/summary/:recording_id',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      // Get transcript
      const { data: transcript, error: transcriptError } = await supabase
        .from('transcripts')
        .select('content')
        .eq('recording_id', req.params.recording_id)
        .single();

      if (transcriptError) {
        return res.status(404).json({ error: 'Transcript not found' });
      }

      // Generate summary
      const summaryContent = await generateSummary(transcript.content);

      // Save summary
      const summaryRecord = {
        id: uuidv4(),
        recording_id: req.params.recording_id,
        content: summaryContent,
        action_items: null,
        decisions: null,
        created_at: new Date(),
      };

      const { data, error } = await supabase
        .from('summaries')
        .insert([summaryRecord])
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.json(data[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Generate mind map
router.post(
  '/mindmap/:recording_id',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      // Get transcript
      const { data: transcript, error: transcriptError } = await supabase
        .from('transcripts')
        .select('content')
        .eq('recording_id', req.params.recording_id)
        .single();

      if (transcriptError) {
        return res.status(404).json({ error: 'Transcript not found' });
      }

      // Generate mind map
      const mindmapContent = await generateMindMap(transcript.content);

      // Save mind map
      const mindmapRecord = {
        id: uuidv4(),
        recording_id: req.params.recording_id,
        content: mindmapContent,
        created_at: new Date(),
      };

      const { data, error } = await supabase
        .from('mindmaps')
        .insert([mindmapRecord])
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.json(data[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
