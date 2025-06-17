export interface Email {
  id: number;
  subject: string;
  from_email: string;
  to_email: string;
  received_at: string;
  text_body: string;
  html_body: string;
  slug: string;
  created_at: string;
}