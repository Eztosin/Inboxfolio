# Deployment Fixes for Netlify

Your Netlify deployment is failing because only the frontend was deployed, but the app needs a backend API. Here are your options:

## 🚀 Option 1: Deploy Backend Separately (Recommended)

### Deploy Backend to Railway (Free & Easy)

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your inboxfolio repository**
5. **Railway will automatically detect and deploy your Express.js backend**
6. **Copy the generated URL (e.g., `https://inboxfolio-production.up.railway.app`)**

### Update Netlify Environment Variables

1. **Go to your Netlify dashboard**
2. **Select your inboxfolio site**
3. **Go to Site settings → Environment variables**
4. **Add this variable:**
   ```
   VITE_API_URL = https://your-railway-url.up.railway.app/api
   ```
5. **Redeploy your site**

### Update netlify.toml

Update the `netlify.toml` file with your actual backend URL:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/api/*"
  to = "https://your-railway-url.up.railway.app/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  VITE_API_URL = "https://your-railway-url.up.railway.app/api"
```

## 🚀 Option 2: Deploy Backend to Heroku

1. **Create a Heroku account**
2. **Install Heroku CLI**
3. **Create Procfile in your project root:**
   ```
   web: node server/index.js
   ```
4. **Deploy:**
   ```bash
   heroku create your-app-name-api
   git subtree push --prefix server heroku main
   ```

## 🚀 Option 3: Use Netlify Functions (Advanced)

Convert your Express API to Netlify Functions:

1. **Create `netlify/functions/` directory**
2. **Convert each API route to a separate function**
3. **Update API calls to use `/.netlify/functions/`**

## 🚀 Option 4: Use a Different Platform

### Vercel (Full-Stack)
- Deploy the entire project to Vercel
- Vercel supports both frontend and API routes

### DigitalOcean App Platform
- Deploy as a full-stack application
- Supports both frontend and backend in one deployment

## ⚡ Quick Fix for Testing

For immediate testing, you can use the sample data without a backend:

1. **Create a mock API service**
2. **Use the sample data from `src/data/sampleEmails.ts`**
3. **This will show the portfolio with demo content**

## 🔧 Environment Variables Needed

Once you deploy your backend, set these in Netlify:

```
VITE_API_URL=https://your-backend-url.com/api
NODE_ENV=production
```

## 📞 Need Help?

1. **Railway is the easiest option** - just connect your GitHub repo
2. **Make sure to update the API URL** in Netlify environment variables
3. **Redeploy after setting environment variables**

The app will work perfectly once the backend is deployed and the API URL is configured!