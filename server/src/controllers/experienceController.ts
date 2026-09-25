import { Request, Response } from 'express';
import Experience from '../models/Experience';
import { EXPERIENCE_DATA } from '../config/resumeData';

export const getExperience = async (req: Request, res: Response) => {
  try {
    const data = await Experience.find();
    if (data && data.length > 0) return res.json({ success: true, count: data.length, data });
    return res.json({ success: true, count: EXPERIENCE_DATA.length, data: EXPERIENCE_DATA, source: 'fallback' });
  } catch (error) {
    return res.json({ success: true, count: EXPERIENCE_DATA.length, data: EXPERIENCE_DATA, source: 'fallback' });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const created = await Experience.create(req.body);
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Experience.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Experience not found' });
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Experience not found' });
    return res.json({ success: true, message: 'Experience deleted' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
