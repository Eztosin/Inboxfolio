# Inboxfolio 📧

Transform your professional emails into a beautiful portfolio showcase. Perfect for freelancers, consultants, and professionals who want to display job offers, testimonials, collaborations, and speaking invitations.

![Inboxfolio Screenshot](https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- **📧 Email Portfolio**: Transform professional emails into a stunning portfolio
- **🎨 Beautiful UI**: Modern, responsive design with dark mode support
- **🔍 Search & Filter**: Find emails quickly with powerful search functionality
- **🚀 Real-time Updates**: Automatically updates as new emails arrive via API
- **🔒 Secure**: HTML sanitization and input validation
- **📱 Mobile-First**: Fully responsive design for all devices
- **⚡ Fast**: Built with Vite and optimized for performance

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **DOMPurify** for HTML sanitization

### Backend
- **Express.js** with TypeScript
- **SQLite3** for data storage
- **CORS** for cross-origin requests
- **Slugify** for URL generation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inboxfolio.git
   cd inboxfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## 📖 API Documentation

### Add New Email
```http
POST /api/emails
Content-Type: application/json

{
  "subject": "Job Offer - Senior Developer",
  "from_email": "hr@company.com",
  "to_email": "you@example.com",
  "received_at": "2024-12-15T10:30:00Z",
  "text_body": "We'd love to offer you a position...",
  "html_body": "<p>We'd love to offer you a position...</p>"
}
```

### Get All Emails
```http
GET /api/emails
```

### Get Email by Slug
```http
GET /api/emails/{slug}
```

### Health Check
```http
GET /api/health
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3001
```

### Database
The application uses SQLite with automatic schema creation and sample data seeding on first run.

## 📁 Project Structure

```
inboxfolio/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── main.tsx           # App entry point
├── server/                # Backend source code
│   ├── database.js        # Database setup and queries
│   └── index.js           # Express server
├── public/                # Static assets
└── dist/                  # Build output
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up environment variables in Netlify dashboard
4. Configure API proxy or deploy backend separately

### Deploy Backend
The Express backend can be deployed to:
- **Heroku**: Add `Procfile` with `web: node server/index.js`
- **Railway**: Connect GitHub repo and deploy
- **DigitalOcean App Platform**: Use the provided spec
- **Vercel**: Deploy as serverless functions

## 🔌 Webhook Integration

Integrate with email services to automatically populate your portfolio:

### Postmark
```javascript
// Webhook endpoint
app.post('/webhook/postmark', (req, res) => {
  const { Subject, From, To, Date, TextBody, HtmlBody } = req.body;
  
  // Transform and save to database
  const emailData = {
    subject: Subject,
    from_email: From,
    to_email: To,
    received_at: Date,
    text_body: TextBody,
    html_body: HtmlBody
  };
  
  // Save via API
  fetch('/api/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailData)
  });
});
```

### Mailgun
```javascript
// Similar webhook setup for Mailgun
app.post('/webhook/mailgun', (req, res) => {
  // Process Mailgun webhook format
});
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update CSS variables in `src/index.css`
- Customize components in `src/components/`

### Email Categories
Add custom categories by modifying the database schema and updating the frontend filters.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons
- [Pexels](https://pexels.com) for stock photography
- [React](https://reactjs.org) for the amazing UI library

## 📞 Support

- 📧 Email: support@inboxfolio.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/inboxfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/inboxfolio/discussions)

---

**Made with ❤️ for professionals who want to showcase their career journey through their inbox.**