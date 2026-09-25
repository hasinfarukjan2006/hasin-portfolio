import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

const ExperienceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    responsibilities: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
