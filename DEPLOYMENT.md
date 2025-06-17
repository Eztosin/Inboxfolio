# Deployment Guide

This guide covers various deployment options for Inboxfolio.

## 🚀 Frontend Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Configure environment variables**
   ```
   NODE_ENV=production
   VITE_API_URL=https://your-api-domain.com
   ```

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🖥️ Backend Deployment

### Railway

1. **Create railway.json**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node server/index.js",
       "healthcheckPath": "/api/health"
     }
   }
   ```

2. **Deploy**
   - Connect your GitHub repository
   - Railway will automatically deploy

### Heroku

1. **Create Procfile**
   ```
   web: node server/index.js
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create .do/app.yaml**
   ```yaml
   name: inboxfolio
   services:
   - name: api
     source_dir: /
     github:
       repo: yourusername/inboxfolio
       branch: main
     run_command: node server/index.js
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /api
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   # Copy package files
   COPY package*.json ./
   RUN npm ci --only=production

   # Copy source code
   COPY . .

   # Build frontend
   RUN npm run build

   EXPOSE 3001

   CMD ["node", "server/index.js"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3001:3001"
       environment:
         - NODE_ENV=production
       volumes:
         - ./data:/app/data
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

## 🔧 Environment Configuration

### Production Environment Variables

```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=sqlite:./data/emails.db

# CORS Origins
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Security
SESSION_SECRET=your-secret-key
```

### Frontend Environment Variables

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# Analytics (optional)
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

## 📊 Monitoring & Analytics

### Health Checks

The API includes a health check endpoint:
```
GET /api/health
```

### Logging

Configure logging for production:

```javascript
// server/middleware/logging.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

### Performance Monitoring

Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Uptime monitoring** services

## 🔒 Security Considerations

### HTTPS
Always use HTTPS in production:
```javascript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### Security Headers
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Rate Limiting
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

## 📈 Scaling

### Database Scaling
For high traffic, consider:
- **PostgreSQL** instead of SQLite
- **Database connection pooling**
- **Read replicas**

### Application Scaling
- **Load balancers**
- **Multiple server instances**
- **CDN for static assets**
- **Caching layers** (Redis)

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

Choose the deployment option that best fits your needs and infrastructure requirements.