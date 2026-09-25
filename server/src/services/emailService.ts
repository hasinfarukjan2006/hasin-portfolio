import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData): Promise<boolean> => {
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'hasinfarukjan@gmail.com';

  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587', 10);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #0d1322; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
      <div style="border-b: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #60a5fa; margin: 0 0 8px 0;">New Portfolio Contact Message</h2>
        <p style="color: #94a3b8; font-size: 14px; margin: 0;">HASIN F Personal Portfolio Website</p>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">From:</strong>
        <p style="font-size: 16px; margin: 4px 0; font-weight: bold; color: #ffffff;">${data.name} &lt;${data.email}&gt;</p>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Subject:</strong>
        <p style="font-size: 16px; margin: 4px 0; color: #38bdf8;">${data.subject}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Message Content:</strong>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap; color: #e2e8f0; font-size: 14px; border-left: 4px solid #3b82f6;">
          ${data.message}
        </div>
      </div>

      <div style="border-t: 1px solid #334155; pt: 16px; font-size: 12px; color: #64748b;">
        <p style="margin: 0;">Received on: ${new Date().toLocaleString()}</p>
        <p style="margin: 4px 0 0 0;">Reply directly to sender: <a href="mailto:${data.email}" style="color: #60a5fa;">${data.email}</a></p>
      </div>
    </div>
  `;

  if (!user || !pass) {
    logger.info(`[Email Service] SMTP credentials not configured in environment. Message from ${data.email} logged and saved to database for ${recipientEmail}.`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"${data.name} (Portfolio)" <${user}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `[Portfolio Contact] ${data.subject}`,
      text: `New contact message from ${data.name} (${data.email}):\n\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      html: htmlContent,
    });

    logger.info(`[Email Service] Email notification successfully sent to ${recipientEmail} for message from ${data.email}`);
    return true;
  } catch (error) {
    logger.error('[Email Service] Failed to send email via SMTP:', error);
    return false;
  }
};
