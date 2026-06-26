import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import { supabase } from '../services/supabaseService';
import { uploadAudioToS3, deleteAudioFromS3 } from '../services/s3Service';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

// Create recording
router.post(
  '/',
  authenticate,
  upload.single('audio'),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      const { title, description, duration } = req.body;

      // Upload to S3
      const audioUrl = await uploadAudioToS3(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      // Save to database
      const recording = {
        id: uuidv4(),
        user_id: req.user?.id,
        title: title || 'Untitled Recording',
        description: description || '',
        audio_url: audioUrl,
        duration: duration || 0,
        file_size: req.file.size,
        language: 'tr',
        created_at: new Date(),
      };

      const { data, error } = await supabase
        .from('recordings')
        .insert([recording])
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json(data[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all recordings for user
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('recordings')
      .select('*')
      .eq('user_id', req.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single recording
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('recordings')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user?.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete recording
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error: selectError } = await supabase
      .from('recordings')
      .select('audio_url')
      .eq('id', req.params.id)
      .eq('user_id', req.user?.id)
      .single();

    if (selectError) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    // Delete from S3
    if (data.audio_url) {
      await deleteAudioFromS3(data.audio_url);
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('recordings')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }

    res.json({ message: 'Recording deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
