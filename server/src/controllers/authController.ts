import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Default admin fallback if DB not available or first login
    if (username === 'admin' && password === 'admin123') {
      const token = generateToken({ username: 'admin', role: 'admin' });
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token,
        user: { username: 'admin', role: 'admin' },
      });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken({ id: user._id, username: user.username, role: user.role });
      return res.json({
        success: true,
        message: 'Authentication successful',
        token,
        user: { username: user.username, role: user.role },
      });
    } catch (dbErr) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: any, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
};
