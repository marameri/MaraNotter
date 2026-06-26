import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../services/supabaseService';

const router = Router();

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
    name?: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

// Register
router.post('/register', async (req: SignUpRequest, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Create user profile
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user?.id,
        email,
        name: name || email.split('@')[0],
        created_at: new Date(),
      },
    ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: authData.user,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    const token = jwt.sign(
      { id: data.user?.id, email: data.user?.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: data.user,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', async (req: Request, res: Response) => {
  try {
    await supabase.auth.signOut();
    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
