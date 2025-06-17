# 🔍 Debugging Your Netlify Deployment

Your backend is working perfectly on Railway, but Netlify isn't connecting to it. Let's debug this step by step.

## 🎯 Step 1: Check Current Configuration

Visit your Netlify site and look for the **Debug Info panel** in the bottom-right corner. This will show:
- ✅ Current API URL being used
- ✅ Health check status
- ✅ Environment details
- ✅ Test buttons

## 🔧 Step 2: Verify Environment Variables

### In Netlify Dashboard:
1. Go to **Site settings** → **Environment variables**
2. Verify you have:
   ```
   VITE_API_URL = https://inboxfolio-production.up.railway.app/api
   ```
3. **Important**: Make sure there are NO extra spaces or trailing slashes!

### Common Issues:
- ❌ `https://inboxfolio-production.up.railway.app/api/` (extra slash)
- ❌ `https://inboxfolio-production.up.railway.app` (missing /api)
- ✅ `https://inboxfolio-production.up.railway.app/api` (correct)

## 🚀 Step 3: Force Redeploy

After setting environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete
4. **Clear your browser cache** (Ctrl+F5 or Cmd+Shift+R)

## 🧪 Step 4: Test API Connection

Use the debug panel buttons:
1. **"Test Health"** - Should show green checkmark
2. **"Test Emails"** - Should show success alert
3. **"Open API"** - Should open Railway API in new tab

## 🔍 Step 5: Check Browser Console

1. Open your Netlify site
2. Press **F12** to open developer tools
3. Go to **Console** tab
4. Look for any error messages
5. Go to **Network** tab and refresh page
6. Check if API calls are being made and their status

## 🚨 Common Issues & Solutions

### Issue 1: CORS Error
**Symptoms**: Console shows CORS policy error
**Solution**: Railway backend already has CORS configured for all origins

### Issue 2: 404 Not Found
**Symptoms**: API calls return 404
**Solution**: Check if Railway URL is correct and accessible

### Issue 3: Environment Variable Not Loading
**Symptoms**: Debug panel shows localhost URL in production
**Solution**: 
1. Verify environment variable name is exactly `VITE_API_URL`
2. Redeploy after setting variables
3. Clear browser cache

### Issue 4: Railway Backend Down
**Symptoms**: Health check fails
**Solution**: Check Railway dashboard for service status

## 🔧 Manual Testing

### Test Railway Backend Directly:
```bash
# Test health endpoint
curl https://inboxfolio-production.up.railway.app/api/health

# Test emails endpoint
curl https://inboxfolio-production.up.railway.app/api/emails
```

### Test from Browser:
1. Open: https://inboxfolio-production.up.railway.app/api/health
2. Should see JSON response with status "OK"
3. Open: https://inboxfolio-production.up.railway.app/api/emails
4. Should see array of 5 sample emails

## 🎯 Expected Results

After fixing, you should see:
- ✅ Debug panel shows green "Connected" status
- ✅ Portfolio page loads 5 sample emails
- ✅ Email cards are clickable
- ✅ Search functionality works
- ✅ No console errors

## 📞 If Still Not Working

1. **Share screenshot** of debug panel
2. **Share screenshot** of Netlify environment variables
3. **Share any console errors**
4. **Confirm Railway backend is accessible** at the direct URL

## 🚀 Alternative Quick Fix

If environment variables aren't working, you can temporarily hardcode the API URL:

1. Edit `src/services/api.ts`
2. Change the first line to:
   ```typescript
   const API_BASE_URL = 'https://inboxfolio-production.up.railway.app/api';
   ```
3. Redeploy

This will confirm if the issue is with environment variables or the connection itself.

---

The debug panel will help us identify exactly what's going wrong! 🔍