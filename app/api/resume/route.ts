import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Resume PDF file not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const { searchParams } = new URL(request.url);
    const isInline = searchParams.get('inline') === 'true' || searchParams.get('view') === '1';

    const disposition = isInline
      ? 'inline; filename="HASIN_F_Resume.pdf"'
      : 'attachment; filename="HASIN_F_Resume.pdf"';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': disposition,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    return NextResponse.json({ error: 'Failed to retrieve resume PDF' }, { status: 500 });
  }
}
