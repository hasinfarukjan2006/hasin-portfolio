import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  id: string;
  title: string;
  issuer: string;
  grade?: string;
  score?: string;
}

const CertificationSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    grade: { type: String },
    score: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);
