import bcrypt from 'bcryptjs';
import Project from '../models/Project';
import Experience from '../models/Experience';
import Skill from '../models/Skill';
import Certification from '../models/Certification';
import Achievement from '../models/Achievement';
import User from '../models/User';
import { PROJECTS_DATA, EXPERIENCE_DATA, SKILLS_DATA, CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA } from '../config/resumeData';
import { logger } from '../utils/logger';

export const seedDatabase = async (): Promise<void> => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      logger.info('Seeding Projects...');
      await Project.insertMany(PROJECTS_DATA);
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      logger.info('Seeding Experience...');
      await Experience.insertMany(EXPERIENCE_DATA);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      logger.info('Seeding Skills...');
      await Skill.insertMany(SKILLS_DATA);
    }

    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      logger.info('Seeding Certifications...');
      await Certification.insertMany(CERTIFICATIONS_DATA);
    }

    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      logger.info('Seeding Achievements...');
      await Achievement.insertMany(ACHIEVEMENTS_DATA);
    }

    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      logger.info('Seeding default Admin User (admin / admin123)...');
      const passwordHash = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        passwordHash,
        role: 'admin',
      });
    }

    logger.info('Database seeding completed successfully.');
  } catch (error) {
    logger.warn('Seed database error (non-fatal):', error);
  }
};
