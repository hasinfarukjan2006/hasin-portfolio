import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/lib/resumeData';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: PROJECTS_DATA.length,
    data: PROJECTS_DATA,
  });
}
