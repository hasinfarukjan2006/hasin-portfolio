import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getStoredMessages, saveMessage, updateMessageStatus, deleteStoredMessage } from '@/lib/messagesStore';

export async function GET() {
  try {
    // Attempt to proxy to express server if available
    try {
      const expressRes = await fetch('http://localhost:5000/api/contact', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (expressRes.ok) {
        const expressData = await expressRes.json();
        if (expressData.data && Array.isArray(expressData.data) && expressData.data.length > 0) {
          return NextResponse.json(expressData);
        }
      }
    } catch (expressErr) {
      // Fallback to local store below
    }

    const messages = getStoredMessages();
    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve messages', data: [] },
      { status: 500 }
    );
  }
}

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

    // 1. Save to local persistent store for Admin Mail Inbox
    const savedMsg = saveMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // 2. Attempt to proxy to express server if running
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
    } catch (expressErr) {
      // Continue to direct Nodemailer dispatch below
    }

    // 3. Direct Nodemailer dispatch to hasinfarukjan@gmail.com
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'hasinfarukjan@gmail.com';
    const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587', 10);
    const user = process.env.EMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    let emailSentSuccessfully = false;

    if (user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"${name} (Portfolio Contact)" <${user}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[Portfolio Contact] ${subject}`,
          html: `
            <div style="font-family: Arial, Helvetica, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b; max-width: 650px; margin: 0 auto;">
              <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="color: #60a5fa; margin: 0 0 6px 0; font-size: 22px;">New Contact Message Received</h2>
                <p style="color: #94a3b8; font-size: 13px; margin: 0;">HASIN F Personal Portfolio Website</p>
              </div>
              
              <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 14px;"><strong>From:</strong> ${name} &lt;<a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>&gt;</p>
                <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 14px;"><strong>Subject:</strong> <span style="color: #38bdf8;">${subject}</span></p>
                <p style="margin: 0; color: #94a3b8; font-size: 12px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div style="margin-bottom: 24px;">
                <h4 style="color: #94a3b8; font-size: 12px; text-transform: uppercase; tracking: 1px; margin: 0 0 8px 0;">Message Content:</h4>
                <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; white-space: pre-wrap; color: #f1f5f9; font-size: 15px; line-height: 1.6; border: 1px solid #334155;">
                  ${message}
                </div>
              </div>

              <div style="border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
                <p style="margin: 0 0 6px 0;">Delivered to: <strong>${recipientEmail}</strong></p>
                <p style="margin: 0;">Click Reply in your email client to respond directly to ${email}</p>
              </div>
            </div>
          `,
        });
        emailSentSuccessfully = true;
      } catch (mailErr) {
        console.error('Next.js API Nodemailer error:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSentSuccessfully
        ? `Thank you, ${name}! Your message has been sent to hasinfarukjan@gmail.com and saved to Admin Mail Inbox.`
        : `Thank you, ${name}! Your message was received and saved to Admin Mail Inbox.`,
      data: savedMsg,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server error processing contact request.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, read, starred } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }
    const updates: any = {};
    if (typeof read === 'boolean') updates.read = read;
    if (typeof starred === 'boolean') updates.starred = starred;

    const updated = updateMessageStatus(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID parameter required' }, { status: 400 });
    }
    const deleted = deleteStoredMessage(id);
    return NextResponse.json({ success: deleted, message: deleted ? 'Message deleted' : 'Message not found' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to delete message' }, { status: 500 });
  }
}
