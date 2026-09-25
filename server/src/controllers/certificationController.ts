import { Request, Response } from 'express';
import Certification from '../models/Certification';
import { CERTIFICATIONS_DATA } from '../config/resumeData';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const data = await Certification.find();
    if (data && data.length > 0) return res.json({ success: true, count: data.length, data });
    return res.json({ success: true, count: CERTIFICATIONS_DATA.length, data: CERTIFICATIONS_DATA, source: 'fallback' });
  } catch (error) {
    return res.json({ success: true, count: CERTIFICATIONS_DATA.length, data: CERTIFICATIONS_DATA, source: 'fallback' });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const created = await Certification.create(req.body);
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Certification.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Certification not found' });
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Certification.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Certification not found' });
    return res.json({ success: true, message: 'Certification deleted' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
