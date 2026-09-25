import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  id: string;
  title: string;
  detail: string;
  type: string;
}

const AchievementSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    detail: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);
