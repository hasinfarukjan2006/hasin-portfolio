import fs from 'fs';
import path from 'path';

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  starred: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

const INITIAL_MESSAGES: ContactMessageItem[] = [
  {
    id: 'msg-101',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techrecruitment.io',
    subject: 'Senior Full Stack / AI Engineer Opportunity at CloudTech',
    message: `Hi Hasin,\n\nI came across your portfolio and was thoroughly impressed by your projects, particularly your AI-integrated full stack applications and clean architecture.\n\nWe have an exciting open role for a Full Stack / AI Engineer at CloudTech. We offer remote work options and competitive compensation.\n\nWould you be open to a quick 15-minute call this week to discuss your availability?\n\nBest regards,\nSarah Jenkins\nSenior Technical Recruiter`,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    read: false,
    starred: true,
  },
  {
    id: 'msg-102',
    name: 'Alex Rivera',
    email: 'alex.rivera@innovatelabs.org',
    subject: 'Hackathon Collaboration & Open Source Project',
    message: `Hey Hasin F,\n\nLoved your portfolio design and your React/Node.js project showcases! Our team is participating in an upcoming AI & Web3 Hackathon next month and we're looking for a sharp developer to join us.\n\nLet me know if you'd be interested in collaborating on this or working together on open-source tools.\n\nCheers,\nAlex Rivera`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: false,
    starred: false,
  },
  {
    id: 'msg-103',
    name: 'David Chen',
    email: 'd.chen@startupventures.com',
    subject: 'Freelance Web Application Development Inquiry',
    message: `Hello Hasin,\n\nI am looking for a talented software engineer to build a high-performance dashboard web app with real-time analytics.\n\nPlease let me know your rates and availability for freelance project work.\n\nThanks,\nDavid Chen`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
    starred: false,
  },
];

function ensureFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(INITIAL_MESSAGES, null, 2), 'utf-8');
  }
}

export function getStoredMessages(): ContactMessageItem[] {
  try {
    ensureFileExists();
    const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return INITIAL_MESSAGES;
  }
}

export function saveMessage(msg: Omit<ContactMessageItem, 'id' | 'createdAt' | 'read' | 'starred'>): ContactMessageItem {
  ensureFileExists();
  const currentMessages = getStoredMessages();
  const newMessage: ContactMessageItem = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
    starred: false,
  };
  const updated = [newMessage, ...currentMessages];
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return newMessage;
}

export function updateMessageStatus(id: string, updates: Partial<ContactMessageItem>): ContactMessageItem | null {
  ensureFileExists();
  const currentMessages = getStoredMessages();
  let updatedMsg: ContactMessageItem | null = null;
  const updated = currentMessages.map((m) => {
    if (m.id === id) {
      updatedMsg = { ...m, ...updates };
      return updatedMsg;
    }
    return m;
  });
  if (updatedMsg) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  }
  return updatedMsg;
}

export function deleteStoredMessage(id: string): boolean {
  ensureFileExists();
  const currentMessages = getStoredMessages();
  const filtered = currentMessages.filter((m) => m.id !== id);
  if (filtered.length !== currentMessages.length) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
  return false;
}
