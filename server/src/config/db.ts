import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hasin_portfolio';
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Database connection warning: ${(error as Error).message}`);
    console.warn('[MongoDB] Server will operate in memory/seed fallback mode for client requests.');
  }
};
