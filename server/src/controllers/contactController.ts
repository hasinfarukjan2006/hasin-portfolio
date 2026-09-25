import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';
import { sendContactEmail } from '../services/emailService';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long.' });
    }

    // Trigger email notification to hasinfarukjan@gmail.com
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    try {
      const contactDoc = await ContactMessage.create({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you for your message! Hasin F will get back to you soon.',
        data: contactDoc,
      });
    } catch (dbErr) {
      // Fallback response if DB offline
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Your message was received.',
        data: { name, email, subject, message, createdAt: new Date() },
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server error processing contact form: ' + error.message });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (error: any) {
    return res.json({ success: true, count: 0, data: [] });
  }
};
