# Inboxfolio 📧

> **Built with [Bolt.new](https://bolt.new)** ⚡

Transform your professional emails into a beautiful portfolio showcase. Perfect for freelancers, consultants, and professionals who want to display job offers, testimonials, collaborations, and speaking invitations.

![Inboxfolio Screenshot](https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🏆 Hackathon Submission

This project was created for the **Bolt.new Hackathon** and showcases the power of AI-assisted development. Built entirely using Bolt.new's AI-powered development environment.

### 🚀 **Built with Bolt.new Features:**
- ⚡ **Rapid Prototyping**: From concept to deployment in hours
- 🤖 **AI-Assisted Development**: Smart code generation and debugging
- 🔄 **Real-time Iteration**: Instant feedback and improvements
- 🌐 **Full-Stack Development**: Frontend and backend in one environment
- 📦 **Automated Deployment**: Seamless deployment to production

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

## 🌟 Bolt.new Development Experience

This project demonstrates the incredible capabilities of Bolt.new:

### 🎯 **What Bolt.new Enabled:**
- **Instant Setup**: No configuration needed - just start coding
- **Smart Suggestions**: AI-powered code completion and improvements
- **Real-time Preview**: See changes instantly as you develop
- **Integrated Deployment**: Deploy to production with one click
- **Full-Stack Awareness**: AI understands both frontend and backend

### 💡 **Development Highlights:**
- Built complete email portfolio system in one session
- AI suggested optimal database schema and API design
- Automatic responsive design implementation
- Smart error handling and edge case coverage
- Production-ready security features out of the box

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
- **Railway**: Connect GitHub repo and deploy (Recommended)
- **Heroku**: Add `Procfile` with `web: node server/index.js`
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

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update CSS variables in `src/index.css`
- Customize components in `src/components/`

### Email Categories
Add custom categories by modifying the database schema and updating the frontend filters.

## 🏆 Hackathon Achievements

### 🎯 **Technical Accomplishments:**
- ✅ Full-stack application with React + Express
- ✅ Real-time API integration
- ✅ Responsive design with dark mode
- ✅ Production-ready deployment
- ✅ Comprehensive documentation
- ✅ Security best practices

### 🚀 **Bolt.new Showcase:**
- ✅ Rapid development from concept to production
- ✅ AI-assisted code generation and optimization
- ✅ Seamless full-stack development experience
- ✅ Automated deployment and configuration
- ✅ Professional-grade application architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Bolt.new](https://bolt.new)** for the incredible AI-powered development experience
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons
- [Pexels](https://pexels.com) for stock photography
- [React](https://reactjs.org) for the amazing UI library

## 📞 Support

- 📧 Email: support@inboxfolio.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/inboxfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/inboxfolio/discussions)

---

**Made with ❤️ and ⚡ [Bolt.new](https://bolt.new) for professionals who want to showcase their career journey through their inbox.**

### 🏆 **Bolt.new Hackathon 2024**
*Demonstrating the future of AI-assisted development*