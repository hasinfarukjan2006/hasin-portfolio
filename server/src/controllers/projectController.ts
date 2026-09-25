import { Request, Response } from 'express';
import Project from '../models/Project';
import { PROJECTS_DATA, ProjectItem } from '../config/resumeData';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ year: -1 });
    if (projects && projects.length > 0) {
      return res.json({ success: true, count: projects.length, data: projects });
    }
    return res.json({ success: true, count: PROJECTS_DATA.length, data: PROJECTS_DATA, source: 'fallback' });
  } catch (error) {
    return res.json({ success: true, count: PROJECTS_DATA.length, data: PROJECTS_DATA, source: 'fallback' });
  }
};

export const getProjectByIdOrSlug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let project = await Project.findOne({ $or: [{ id }, { slug: id }] });
    if (!project) {
      const fallback = PROJECTS_DATA.find((p: ProjectItem) => p.id === id || p.slug === id);
      if (fallback) {
        return res.json({ success: true, data: fallback });
      }
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, data: project });
  } catch (error) {
    const { id } = req.params;
    const fallback = PROJECTS_DATA.find((p: ProjectItem) => p.id === id || p.slug === id);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await Project.create(req.body);
    return res.status(201).json({ success: true, data: newProject });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Project.findOneAndUpdate({ $or: [{ id }, { slug: id }] }, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findOneAndDelete({ $or: [{ id }, { slug: id }] });
    if (!deleted) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
