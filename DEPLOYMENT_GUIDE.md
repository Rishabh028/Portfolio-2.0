# Deployment Guide - Portfolio 2.0

Complete guide to deploy your portfolio to GitHub and Vercel.

## Step 1: Push to GitHub

### 1a. Create a GitHub Account (if you don't have one)
- Go to [GitHub.com](https://github.com)
- Sign up with email and create an account

### 1b. Create a New Repository on GitHub
1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** icon in top right → Select **New repository**
3. Name it: `portfolio-2.0` (or your preferred name)
4. Add description: "My modern, animated React portfolio"
5. Choose **Public** (so it's visible to others)
6. Click **Create repository**
7. Copy the repository URL (you'll need it soon)

### 1c. Configure Git Locally
Open PowerShell and run these commands:

```powershell
# Set your git user name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

### 1d. Add Remote and Push to GitHub
```powershell
cd "c:\Users\Rishabh\OneDrive\Desktop\Coding\Portfolio 2.0"

# Add remote repository (replace URL with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-2.0.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio project with animations and skills filter"

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username and `portfolio-2.0` with your repo name.

---

## Step 2: Deploy to Vercel

### 2a. Create a Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Sign up with GitHub** (recommended)
4. Authorize Vercel to access your GitHub account

### 2b. Import Project to Vercel
1. After login, click **Add New** → **Project**
2. Click **Import Git Repository**
3. Select your `portfolio-2.0` repository
4. Click **Import**

### 2c. Configure Deployment Settings
1. **Framework Preset**: Select `Vite`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**: (leave empty for now)
5. Click **Deploy**

Vercel will automatically build and deploy your project! ✨

---

## Step 3: Access Your Deployed Portfolio

After deployment completes (usually 1-2 minutes):
- Your live URL will be shown (something like `https://portfolio-2-0-YOUR-NAME.vercel.app`)
- Click the link to view your live portfolio
- Share this URL with recruiters, friends, etc!

---

## Step 4: Custom Domain (Optional)

To connect a custom domain (like `rishabh.dev`):

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Enter your custom domain
4. Follow DNS configuration instructions from your domain provider

---

## Step 5: Making Updates

Whenever you make changes to your portfolio:

```powershell
cd "c:\Users\Rishabh\OneDrive\Desktop\Coding\Portfolio 2.0"

# Stage changes
git add .

# Commit with message
git commit -m "Update: [describe your changes]"

# Push to GitHub
git push origin main
```

**Vercel will automatically redeploy when you push to GitHub!** 🚀

---

## Useful Commands

### View deployment logs
```powershell
# Build locally to test
npm run build
```

### Test locally before pushing
```powershell
npm run dev
# Visit http://localhost:5174
```

### View git status
```powershell
git status
```

### View commit history
```powershell
git log --oneline
```

---

## Troubleshooting

### Build fails on Vercel
- Ensure `package.json` has all correct dependencies
- Check that all imports use correct paths
- Verify no syntax errors in TypeScript/TSX files

### Custom domain not working
- Wait 24-48 hours for DNS to propagate
- Double-check DNS settings match Vercel's instructions
- Clear browser cache or try incognito mode

### Changes not updating after push
- Wait 2-3 minutes for Vercel to rebuild
- Check Vercel deployment log for errors
- Clear browser cache (Ctrl+Shift+Del)

---

## What to Share

Once deployed, you can share:
- **Live URL**: `https://your-portfolio-url.vercel.app`
- **GitHub Repository**: `https://github.com/username/portfolio-2-0`

Great for:
- Job applications
- LinkedIn profile
- Resume/CV
- Social media

---

## Next Steps

After deployment:
1. ✅ Customize portfolio content with your real information
2. ✅ Add your actual projects and descriptions
3. ✅ Update skills with your technologies
4. ✅ Connect contact form to email service (Formspree, EmailJS, etc.)
5. ✅ Get feedback and iterate

Good luck! 🎉
