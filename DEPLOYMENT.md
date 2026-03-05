# 🚀 Deployment Guide

This guide will help you deploy the AI Movie Insight Builder to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- All three API keys ready:
  - OMDb API Key
  - TMDB API Key
  - Google Gemini API Key

## Step-by-Step Deployment

### 1. Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: AI Movie Insight Builder"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `OMDB_API_KEY` | Your OMDb API key | Movie metadata |
| `TMDB_API_KEY` | Your TMDB API key | Audience reviews |
| `GEMINI_API_KEY` | Your Gemini API key | AI sentiment analysis |

**Important:** Make sure to add these for all environments (Production, Preview, Development)

### 4. Deploy

Click **"Deploy"** and Vercel will:
- Install dependencies
- Build your Next.js application
- Deploy to a production URL

The deployment typically takes 2-3 minutes.

### 5. Verify Deployment

Once deployed:
1. Visit your production URL
2. Test with a sample IMDb ID (e.g., `tt0133093`)
3. Verify all features work:
   - Movie details load correctly
   - Reviews are displayed
   - AI sentiment analysis appears

## Troubleshooting

### Build Failures

**Issue:** Build fails with "Module not found"
- **Solution:** Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue:** TypeScript errors during build
- **Solution:** Run `npm run build` locally first
- Fix any TypeScript errors before deploying

### Runtime Errors

**Issue:** "API key not configured" errors
- **Solution:** Double-check environment variables in Vercel dashboard
- Ensure no extra spaces in API keys
- Redeploy after adding/updating variables

**Issue:** Movie data not loading
- **Solution:** Verify API keys are valid and not expired
- Check API rate limits
- Review Vercel function logs for errors

### Performance Issues

**Issue:** Slow page loads
- **Solution:** Enable Vercel Edge Network (automatic)
- Verify API responses are being cached
- Check Vercel Analytics for insights

## Environment Variables Management

### Local Development
Use `.env.local` file (never commit this):
```env
OMDB_API_KEY=your_key
TMDB_API_KEY=your_key
GEMINI_API_KEY=your_key
```

### Production (Vercel)
Set via Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add each variable
4. Select environments (Production, Preview, Development)

## Continuous Deployment

Vercel automatically deploys:
- **Production:** When you push to `main` branch
- **Preview:** When you create a pull request
- **Development:** When you push to other branches

## Custom Domain (Optional)

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

## Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- Track page views, performance, and user behavior

### Error Tracking
- Check Vercel Functions logs for runtime errors
- Review build logs for deployment issues

## Best Practices

1. **Test Locally First**
   ```bash
   npm run build
   npm start
   ```

2. **Use Preview Deployments**
   - Test changes in preview before merging to main

3. **Monitor API Usage**
   - Keep track of API rate limits
   - Consider implementing caching strategies

4. **Keep Dependencies Updated**
   ```bash
   npm update
   ```

5. **Review Logs Regularly**
   - Check Vercel dashboard for errors
   - Monitor function execution times

## Rollback

If a deployment has issues:
1. Go to Deployments tab in Vercel
2. Find the last working deployment
3. Click "..." → "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Happy Deploying! 🎉**
