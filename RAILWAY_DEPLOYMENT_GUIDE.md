# Railway Deployment Guide - Getting Your Public URL

If Railway deployed but didn't generate a URL, follow these steps:

## 🚀 Step 1: Check Railway Dashboard

1. **Go to [Railway.app](https://railway.app)**
2. **Sign in to your account**
3. **Find your deployed project**
4. **Click on your project**

## 🔧 Step 2: Generate Public Domain

### Option A: Enable Public Domain
1. **In your Railway project dashboard**
2. **Click on your service/deployment**
3. **Go to the "Settings" tab**
4. **Scroll down to "Networking" section**
5. **Click "Generate Domain"** or **"Add Public Domain"**
6. **Railway will generate a URL like: `https://your-project-name.up.railway.app`**

### Option B: Check Deployments Tab
1. **Click on "Deployments" tab**
2. **Look for your latest deployment**
3. **Click on it to see deployment details**
4. **The public URL should be shown there**

### Option C: Check Variables Tab
1. **Go to "Variables" tab**
2. **Look for `RAILWAY_PUBLIC_DOMAIN` or similar**
3. **This will show your public URL**

## 🔍 Step 3: Verify Backend is Working

Once you have the URL, test it:

```bash
# Test health endpoint
curl https://your-railway-url.up.railway.app/api/health

# Should return:
{
  "status": "OK",
  "message": "Inboxfolio API is running",
  "timestamp": "2024-12-15T...",
  "version": "1.0.0"
}
```

## 🌐 Step 4: Update Netlify Environment Variables

1. **Go to Netlify Dashboard**
2. **Select your inboxfolio site**
3. **Go to Site settings → Environment variables**
4. **Update `VITE_API_URL` with your Railway URL:**
   ```
   VITE_API_URL = https://your-railway-url.up.railway.app/api
   ```

## 🔄 Step 5: Redeploy Netlify Site

1. **Go to Netlify site dashboard**
2. **Click "Trigger deploy" → "Deploy site"**
3. **Wait for deployment to complete**
4. **Test your portfolio page**

## 🚨 Troubleshooting

### If Railway Still Doesn't Show URL:

1. **Check Build Logs:**
   - Go to Deployments tab
   - Click on latest deployment
   - Check if build succeeded

2. **Verify Port Configuration:**
   - Railway expects your app to listen on `process.env.PORT`
   - Our server already does this: `const PORT = process.env.PORT || 3001;`

3. **Check Service Status:**
   - Make sure the service is "Active" not "Crashed"

### If Build Failed:

1. **Add package.json scripts for Railway:**
   ```json
   {
     "scripts": {
       "start": "node server/index.js",
       "railway:build": "npm install",
       "railway:start": "node server/index.js"
     }
   }
   ```

2. **Create railway.json with correct config:**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node server/index.js"
     }
   }
   ```

## 🎯 Alternative: Redeploy to Railway

If you're still having issues:

1. **Delete the current Railway deployment**
2. **Create a new Railway project**
3. **Connect your GitHub repository again**
4. **Make sure to select the correct branch (main)**

## 📞 Quick Support

If you're still stuck:
1. **Share your Railway project dashboard screenshot**
2. **Check the Railway Discord/Support for help**
3. **Or try deploying to Heroku instead**

## ✅ Success Checklist

- [ ] Railway project deployed successfully
- [ ] Public domain/URL generated
- [ ] API health endpoint responds
- [ ] Netlify environment variable updated
- [ ] Netlify site redeployed
- [ ] Portfolio page loads emails

---

Once you get the Railway URL, your Inboxfolio will be fully functional! 🎉