import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'emails.db');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      from_email TEXT NOT NULL,
      to_email TEXT NOT NULL,
      received_at DATETIME NOT NULL,
      text_body TEXT,
      html_body TEXT,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Emails table ready');
      insertSampleData();
    }
  });
}

function insertSampleData() {
  // Check if we already have data
  db.get('SELECT COUNT(*) as count FROM emails', (err, row) => {
    if (err) {
      console.error('Error checking data:', err.message);
      return;
    }

    if (row.count === 0) {
      console.log('Inserting sample data...');
      const sampleEmails = [
        {
          subject: 'Senior Frontend Developer Position - TechCorp',
          from_email: 'sarah.johnson@techcorp.com',
          to_email: 'you@example.com',
          received_at: '2024-12-15 10:30:00',
          text_body: 'Hi there,\n\nWe were impressed by your portfolio and would love to discuss a Senior Frontend Developer position with our team. The role offers competitive compensation, remote work flexibility, and the opportunity to work on cutting-edge projects.\n\nWould you be available for a call this week?\n\nBest regards,\nSarah Johnson\nTalent Acquisition Manager',
          html_body: '<p>Hi there,</p><p>We were impressed by your <strong>portfolio</strong> and would love to discuss a <em>Senior Frontend Developer</em> position with our team. The role offers:</p><ul><li>Competitive compensation</li><li>Remote work flexibility</li><li>Cutting-edge projects</li></ul><p>Would you be available for a call this week?</p><p>Best regards,<br><strong>Sarah Johnson</strong><br>Talent Acquisition Manager</p>',
          slug: 'senior-frontend-developer-position-techcorp'
        },
        {
          subject: 'Amazing work on the React dashboard project!',
          from_email: 'mike@startupxyz.com',
          to_email: 'you@example.com',
          received_at: '2024-12-10 14:22:00',
          text_body: 'Hey,\n\nI wanted to reach out and tell you how impressed we were with the React dashboard you built for us. The attention to detail, performance optimization, and user experience exceeded our expectations.\n\nWe\'ll definitely be recommending you to other companies in our network. Thank you for the excellent work!\n\nCheers,\nMike Chen\nCTO, StartupXYZ',
          html_body: '<p>Hey,</p><p>I wanted to reach out and tell you how impressed we were with the <strong>React dashboard</strong> you built for us. The attention to:</p><ul><li>Detail</li><li>Performance optimization</li><li>User experience</li></ul><p>exceeded our expectations.</p><p>We\'ll definitely be <em>recommending you</em> to other companies in our network. Thank you for the excellent work!</p><p>Cheers,<br><strong>Mike Chen</strong><br>CTO, StartupXYZ</p>',
          slug: 'amazing-work-react-dashboard-project'
        },
        {
          subject: 'Collaboration Opportunity - Design System Project',
          from_email: 'emma@designstudio.co',
          to_email: 'you@example.com',
          received_at: '2024-12-08 09:15:00',
          text_body: 'Hello,\n\nWe\'re launching a new design system project and would love to collaborate with you on the frontend implementation. Your expertise in React and component architecture would be invaluable.\n\nThe project timeline is 8-10 weeks with flexible remote work. Interested in learning more?\n\nBest,\nEmma Rodriguez\nCreative Director',
          html_body: '<p>Hello,</p><p>We\'re launching a new <strong>design system project</strong> and would love to collaborate with you on the frontend implementation. Your expertise in:</p><ul><li>React</li><li>Component architecture</li></ul><p>would be invaluable.</p><p>The project timeline is <em>8-10 weeks</em> with flexible remote work. Interested in learning more?</p><p>Best,<br><strong>Emma Rodriguez</strong><br>Creative Director</p>',
          slug: 'collaboration-opportunity-design-system-project'
        },
        {
          subject: 'Speaking Invitation - ReactConf 2024',
          from_email: 'david@reactconf.org',
          to_email: 'you@example.com',
          received_at: '2024-12-05 16:45:00',
          text_body: 'Hi,\n\nWe\'d like to invite you to speak at ReactConf 2024 about your innovative approach to state management in large-scale applications. Your blog posts on this topic have gained significant attention in the community.\n\nThe conference is scheduled for June 15-17, 2024 in San Francisco. We cover all expenses and provide an honorarium.\n\nWould you be interested?\n\nRegards,\nDavid Park\nProgram Committee Chair',
          html_body: '<p>Hi,</p><p>We\'d like to invite you to speak at <strong>ReactConf 2024</strong> about your innovative approach to <em>state management in large-scale applications</em>. Your blog posts on this topic have gained significant attention in the community.</p><p>The conference is scheduled for <strong>June 15-17, 2024</strong> in San Francisco. We cover:</p><ul><li>All expenses</li><li>Honorarium</li></ul><p>Would you be interested?</p><p>Regards,<br><strong>David Park</strong><br>Program Committee Chair</p>',
          slug: 'speaking-invitation-reactconf-2024'
        },
        {
          subject: 'Freelance Web Development Project',
          from_email: 'lisa@ecommercepro.com',
          to_email: 'you@example.com',
          received_at: '2024-12-01 11:20:00',
          text_body: 'Hello,\n\nWe found your profile through a referral and are interested in hiring you for a complete e-commerce website rebuild. The project involves React, Node.js, and payment integration.\n\nBudget is $15,000-20,000 with a 12-week timeline. Are you available to discuss this opportunity?\n\nThanks,\nLisa Thompson\nProject Manager',
          html_body: '<p>Hello,</p><p>We found your profile through a referral and are interested in hiring you for a <strong>complete e-commerce website rebuild</strong>. The project involves:</p><ul><li>React</li><li>Node.js</li><li>Payment integration</li></ul><p>Budget is <strong>$15,000-20,000</strong> with a <em>12-week timeline</em>. Are you available to discuss this opportunity?</p><p>Thanks,<br><strong>Lisa Thompson</strong><br>Project Manager</p>',
          slug: 'freelance-web-development-project'
        }
      ];

      const insertQuery = `
        INSERT INTO emails (subject, from_email, to_email, received_at, text_body, html_body, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      sampleEmails.forEach(email => {
        db.run(insertQuery, [
          email.subject,
          email.from_email,
          email.to_email,
          email.received_at,
          email.text_body,
          email.html_body,
          email.slug
        ], (err) => {
          if (err) {
            console.error('Error inserting sample email:', err.message);
          }
        });
      });

      console.log('Sample data inserted successfully');
    }
  });
}

export function getAllEmails() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM emails ORDER BY received_at DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getEmailBySlug(slug) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM emails WHERE slug = ?', [slug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function insertEmail(emailData) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO emails (subject, from_email, to_email, received_at, text_body, html_body, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [
      emailData.subject,
      emailData.from_email,
      emailData.to_email,
      emailData.received_at,
      emailData.text_body,
      emailData.html_body,
      emailData.slug
    ], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, ...emailData });
      }
    });
  });
}