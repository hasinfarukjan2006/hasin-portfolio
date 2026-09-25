import { Request, Response } from 'express';
import Skill from '../models/Skill';
import { SKILLS_DATA } from '../config/resumeData';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const data = await Skill.find();
    if (data && data.length > 0) return res.json({ success: true, count: data.length, data });
    return res.json({ success: true, count: SKILLS_DATA.length, data: SKILLS_DATA, source: 'fallback' });
  } catch (error) {
    return res.json({ success: true, count: SKILLS_DATA.length, data: SKILLS_DATA, source: 'fallback' });
  }
};
