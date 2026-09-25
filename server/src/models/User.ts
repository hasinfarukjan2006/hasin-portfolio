import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  role: 'admin';
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
