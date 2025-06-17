import express from 'express';
import cors from 'cors';
import slugify from 'slugify';
import { getAllEmails, getEmailBySlug, insertEmail } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? true // Allow all origins in production for now
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint for Railway health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Inboxfolio API is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    endpoints: {
      health: '/api/health',
      emails: '/api/emails',
      singleEmail: '/api/emails/:slug'
    }
  });
});

// Routes
app.get('/api/emails', async (req, res) => {
  try {
    const emails = await getAllEmails();
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ 
      error: 'Failed to fetch emails',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.get('/api/emails/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length > 200) {
      return res.status(400).json({ error: 'Invalid slug format' });
    }

    const email = await getEmailBySlug(slug);
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }
    res.json(email);
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ 
      error: 'Failed to fetch email',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.post('/api/emails', async (req, res) => {
  try {
    const { subject, from_email, to_email, received_at, text_body, html_body } = req.body;

    // Validate required fields
    if (!subject || !from_email || !to_email || !received_at) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['subject', 'from_email', 'to_email', 'received_at']
      });
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email) || !emailRegex.test(to_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate date format
    const date = new Date(received_at);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid date format for received_at' });
    }

    // Validate content length
    if (subject.length > 500) {
      return res.status(400).json({ error: 'Subject too long (max 500 characters)' });
    }

    if (text_body && text_body.length > 50000) {
      return res.status(400).json({ error: 'Text body too long (max 50,000 characters)' });
    }

    if (html_body && html_body.length > 100000) {
      return res.status(400).json({ error: 'HTML body too long (max 100,000 characters)' });
    }

    // Generate unique slug
    let baseSlug = slugify(subject, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (true) {
      try {
        const existingEmail = await getEmailBySlug(slug);
        if (!existingEmail) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
        
        // Prevent infinite loop
        if (counter > 1000) {
          slug = `${baseSlug}-${Date.now()}`;
          break;
        }
      } catch (error) {
        break; // If error, assume slug doesn't exist
      }
    }

    const emailData = {
      subject: subject.trim(),
      from_email: from_email.trim().toLowerCase(),
      to_email: to_email.trim().toLowerCase(),
      received_at: date.toISOString(),
      text_body: text_body ? text_body.trim() : '',
      html_body: html_body ? html_body.trim() : '',
      slug
    };

    const newEmail = await insertEmail(emailData);
    res.status(201).json(newEmail);
  } catch (error) {
    console.error('Error creating email:', error);
    res.status(500).json({ 
      error: 'Failed to create email',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Inboxfolio API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Inboxfolio API server running on port ${PORT}`);
  console.log(`📧 Ready to receive emails at http://localhost:${PORT}/api/emails`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Server accessible at: http://0.0.0.0:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});