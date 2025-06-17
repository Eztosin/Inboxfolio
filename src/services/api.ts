import { Email } from '../types/Email';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const emailService = {
  async getAllEmails(): Promise<Email[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/emails`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw new Error('Failed to fetch emails. Please check your connection and try again.');
    }
  },

  async getEmailBySlug(slug: string): Promise<Email> {
    try {
      const response = await fetch(`${API_BASE_URL}/emails/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Email not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching email:', error);
      throw error;
    }
  },

  async createEmail(emailData: {
    subject: string;
    from_email: string;
    to_email: string;
    received_at: string;
    text_body?: string;
    html_body?: string;
  }): Promise<Email> {
    try {
      const response = await fetch(`${API_BASE_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error creating email:', error);
      throw new Error('Failed to create email');
    }
  }
};