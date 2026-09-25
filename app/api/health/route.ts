import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'HASIN F Portfolio Next.js Engine',
    environment: process.env.NODE_ENV || 'development',
  });
}
