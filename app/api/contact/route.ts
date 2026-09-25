import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields (Name, Email, Subject, Message) are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Attempt to proxy to express server if available
    try {
      const expressRes = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (expressRes.ok) {
        const data = await expressRes.json();
        return NextResponse.json(data);
      }
    } catch (expressErr) {
      // Continue to direct email dispatch below
    }

    // Direct Nodemailer dispatch to hasinfarukjan@gmail.com
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'hasinfarukjan@gmail.com';
    const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587', 10);
    const user = process.env.EMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    if (user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"${name} (Portfolio)" <${user}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[Portfolio Contact] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0d1322; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
              <h2 style="color: #60a5fa; margin-top: 0;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-top: 12px; white-space: pre-wrap; color: #e2e8f0; border-left: 4px solid #3b82f6;">
                ${message}
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 20px;">Target recipient: ${recipientEmail}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('Next.js API email sending error:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! HASIN F will respond to your email shortly.',
      data: { name, email, subject, message, createdAt: new Date() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server error processing contact request.' },
      { status: 500 }
    );
  }
}
