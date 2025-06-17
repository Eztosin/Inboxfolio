import { Email } from '../types/Email';

const API_BASE_URL = 'http://localhost:3001/api';

export const emailService = {
  async getAllEmails(): Promise<Email[]> {
    const response = await fetch(`${API_BASE_URL}/emails`);
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }
    return response.json();
  },

  async getEmailBySlug(slug: string): Promise<Email> {
    const response = await fetch(`${API_BASE_URL}/emails/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email');
    }
    return response.json();
  },

  async createEmail(emailData: {
    subject: string;
    from_email: string;
    to_email: string;
    received_at: string;
    text_body?: string;
    html_body?: string;
  }): Promise<Email> {
    const response = await fetch(`${API_BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create email');
    }
    return response.json();
  }
};