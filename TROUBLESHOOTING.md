# 🛠️ Troubleshooting & Quick Reference Guide

## ✅ Current Status: Project Running Successfully

Your portfolio is running at **http://localhost:5173/**

---

## 🔴 Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart your terminal/PowerShell
- Run `npm install` again

### Issue 2: Port 5173 Already in Use
**Solution:**
```bash
# Option A: Kill the process using port 5173
# (Windows PowerShell)
Get-Process | Where-Object {$_.name -like "*node*"} | Stop-Process -Force

# Option B: Use a different port
# Edit vite.config.ts, change port: 5173 to port: 3000
npm run dev
```

### Issue 3: Module Not Found Errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue 4: "Cannot find module @/components/ui/..."
**Solution:**
- Ensure the file exists in the correct path
- Check that `@` alias is properly configured in vite.config.ts
- Run `npm run dev` again

### Issue 5: Tailwind CSS Not Applying
**Solution:**
```bash
# Restart the dev server
# Press Ctrl+C to stop
# Run npm run dev again
```

### Issue 6: TypeScript Errors in UI Components
**Solution:**
```bash
# These are normal and don't affect runtime
# To suppress them:
# 1. Open VSCode settings
# 2. Search for "typescript.validate"
# 3. Ensure it's enabled
# 4. Restart VSCode
```

---

## 📝 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server (currently running)
npm run dev:open    # Start dev server and open browser

# Production
npm run build        # Create production build
npm run preview      # Preview production build locally

# Quality Checks
npm run lint         # Run ESLint checks
npm run lint --fix   # Automatically fix lint issues

# Utilities
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Check for vulnerabilities
npm audit fix        # Fix non-breaking vulnerabilities
```

---

## 🎨 Customization Guide

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "#your-color",
      secondary: "#your-color",
    }
  }
}
```

### Add Custom Fonts
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
  mono: ['Your Mono Font', 'monospace'],
}
```

### Modify Typography
Edit `index.css`:
```css
@layer base {
  body {
    @apply font-sans text-lg;
  }
}
```

### Adjust Animations
Edit `tailwind.config.js`:
```javascript
animation: {
  "custom": "customKeyframe 2s ease-in-out infinite",
}
```

---

## 📂 File Organization

### Where to Add New Components
```
src/components/
├── ui/                 # Reusable UI components (shadcn-style)
├── Hero.tsx           # Homepage sections
├── About.tsx
└── sections/          # Page sections
```

### Where to Add New Pages
```
src/pages/
├── Index.tsx          # Homepage
├── NotFound.tsx       # 404 page
└── YourPage.tsx       # Add new pages here
```

### Where to Add Hooks
```
src/hooks/
├── use-mobile.tsx     # Existing hooks
├── use-toast.tsx
└── useYourHook.ts     # Add your custom hooks
```

### Where to Add Utilities
```
src/lib/
├── utils.ts           # General utilities
└── constants.ts       # Constants and config
```

---

## 🔄 Git Workflow

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/your-repo.git
git branch -M main
git push -u origin main
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: Netlify
```bash
# Build the project
npm run build

# Deploy the 'dist' folder
# Then use Netlify's web interface
```

### Option 3: GitHub Pages
```bash
# Add to package.json
"deploy": "npm run build && gh-pages -d dist"

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

---

## 🧪 Testing Your Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check bundle size
npm run build -- --report
```

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Total Dependencies | 363 |
| Total UI Components | 49 |
| TypeScript Files | 50+ |
| CSS (with Tailwind) | ~1500 lines |
| Total Package Size | ~150MB (node_modules) |
| Build Size (estimated) | ~250KB (gzipped) |

---

## 🔐 Environment Variables

If you need environment variables, create `.env.local`:

```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=development
```

Access in your code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📚 Useful Resources

### Documentation
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Radix UI Docs](https://www.radix-ui.com/)

### Learning
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind UI Examples](https://tailwindui.com/)
- [React Patterns](https://react-patterns.com/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [ES Lint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🆘 Getting Help

### If Something Breaks

1. **Check the console errors**
   - Open DevTools (F12)
   - Look at the Console tab
   - Search for the error message

2. **Check the terminal**
   - See what npm is reporting
   - Look for red error messages

3. **Restart the dev server**
   - Press Ctrl+C in terminal
   - Run `npm run dev` again

4. **Clear cache**
   ```bash
   # Clear Vite cache
   rm -r node_modules/.vite
   
   # Reinstall everything
   rm -r node_modules package-lock.json
   npm install
   ```

---

## 💡 Best Practices

1. **Use TypeScript** - Catch errors before runtime
2. **Component Composition** - Break UI into small components
3. **Don't Repeat Code** - Use the component library
4. **Keep Styles in Tailwind** - Avoid inline CSS when possible
5. **Test Locally** - Use `npm run build && npm run preview`
6. **Commit Often** - Use git to track changes
7. **Document Changes** - Use meaningful commit messages

---

## 🎯 Next Milestones

- [ ] Customize portfolio content
- [ ] Add your projects
- [ ] Update about section
- [ ] Add contact form integration
- [ ] Set up analytics
- [ ] Deploy to production
- [ ] Monitor performance
- [ ] Gather user feedback

---

**You're all set! Happy coding! 🚀**
