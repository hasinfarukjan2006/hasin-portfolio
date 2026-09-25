import { Request, Response } from 'express';
import Achievement from '../models/Achievement';
import { ACHIEVEMENTS_DATA } from '../config/resumeData';

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const data = await Achievement.find();
    if (data && data.length > 0) return res.json({ success: true, count: data.length, data });
    return res.json({ success: true, count: ACHIEVEMENTS_DATA.length, data: ACHIEVEMENTS_DATA, source: 'fallback' });
  } catch (error) {
    return res.json({ success: true, count: ACHIEVEMENTS_DATA.length, data: ACHIEVEMENTS_DATA, source: 'fallback' });
  }
};

export const createAchievement = async (req: Request, res: Response) => {
  try {
    const created = await Achievement.create(req.body);
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Achievement.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Achievement not found' });
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Achievement.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Achievement not found' });
    return res.json({ success: true, message: 'Achievement deleted' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
