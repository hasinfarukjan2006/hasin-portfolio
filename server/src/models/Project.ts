import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  year: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  categories?: string[];
  architectureNotes?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String },
    year: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    techStack: [{ type: String }],
    features: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    categories: [{ type: String }],
    architectureNotes: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
