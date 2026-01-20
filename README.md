# 🚀 Portfolio 2.0 - Modern Animated React Portfolio

A stunning, fully animated portfolio website built with React, TypeScript, and Framer Motion. Features smooth scroll animations, interactive skill filters, project showcase, and a responsive design that works on all devices.

   <a href="https://our-voice-our-rights-kyrgtd2ew-rishabh028s-projects.vercel.app/">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-View_Site-28a745?style=for-the-badge&logo=vercel"/>
  </a>


---

## ✨ Key Features

### 🎨 Modern Design & Animations
- ✅ **Smooth Scroll Animations** - Hero text fades as you scroll down
- ✅ **Interactive Animations** - Framer Motion for fluid, performant animations
- ✅ **Magnetic Button Effects** - Buttons follow cursor movement
- ✅ **Staggered Text Reveal** - Character-by-character animation on page load
- ✅ **Particle Background** - Animated floating particles for visual depth

### 🎯 Interactive Features
- ✅ **Skill Filters** - Click buttons to filter skills by category (Frontend, Backend, Tools, etc.)
- ✅ **Project Showcase** - Display projects with descriptions, tech stack, and links
- ✅ **Resume Download** - One-click resume download functionality
- ✅ **Contact Section** - Fully styled contact form ready for email integration
- ✅ **Dark/Light Theme** - Theme toggle with persistent storage

### 📱 Responsive Design
- ✅ **Mobile Optimized** - Perfect layout on phones, tablets, and desktops
- ✅ **Touch-Friendly** - All interactive elements optimized for touch
- ✅ **Performance Optimized** - Fast load times with Vite build tool

### 🛠️ Developer Features
- ✅ **TypeScript** - Full type safety across the codebase
- ✅ **49 UI Components** - Pre-built shadcn-style components
- ✅ **Git Version Control** - Full commit history
- ✅ **Code Quality** - ESLint & Prettier configured

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3.1 |
| **Language** | TypeScript 5.8.3 |
| **Build Tool** | Vite 5.4.21 |
| **Styling** | Tailwind CSS 3.4.17 |
| **Animations** | Framer Motion |
| **UI Components** | Radix UI + shadcn |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishabh028/Portfolio-2.0.git
   cd Portfolio-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio-2-0/
├── src/
│   ├── components/
│   │   ├── Hero.tsx                 # Main landing section
│   │   ├── SkillsSection.tsx        # Skills with filters
│   │   ├── Projects.tsx             # Project showcase
│   │   ├── Contact.tsx              # Contact form
│   │   ├── Navigation.tsx           # Navbar
│   │   ├── CustomCursor.tsx         # Custom cursor
│   │   ├── PageTransition.tsx       # Animations
│   │   ├── ThemeToggle.tsx          # Dark/Light theme
│   │   └── ui/                      # 49 UI components
│   ├── pages/
│   │   └── Index.tsx                # Main page
│   ├── assets/                      # Images
│   ├── hooks/                       # Custom hooks
│   ├── lib/                         # Utils
│   └── main.tsx                     # Entry point
├── public/
│   └── resume.txt                   # Resume file
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Customization Guide

### Update Your Information

1. **Hero Section** - Edit `src/components/Hero.tsx`
   - Change name, title, and tagline
   - Update location and bio
   - Replace profile image in `src/assets/`

2. **Skills** - Edit `src/components/SkillsSection.tsx`
   - Update `skillsData` array
   - Adjust proficiency levels
   - Add/remove categories

3. **Projects** - Edit `src/components/Projects.tsx`
   - Add your real projects
   - Update descriptions and links
   - Add project images

4. **Resume** - Replace `public/resume.txt`
   - Add your actual resume
   - Or use PDF format

5. **Contact Form** - Edit `src/components/Contact.tsx`
   - Integrate with Formspree, EmailJS, or backend

### Colors & Theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

## 🎯 Key Components Explained

### Hero Component (`src/components/Hero.tsx`)
- Animated hero text with scroll fade effect
- Magnetic button effect
- Character-by-character text reveal
- Resume download functionality

### Skills Section (`src/components/SkillsSection.tsx`)
- Interactive category filters
- Skill cards with progress bars
- Hover animations

### Projects Section (`src/components/Projects.tsx`)
- Project showcase cards
- Technology tags
- Links to GitHub and live demos

### Contact Section (`src/components/Contact.tsx`)
- Form validation
- Error handling
- Ready for email integration

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Visit vercel.com
3. Import Portfolio-2.0 repository
4. Click Deploy
5. Done! Automatic redeploys on every push

### Update Workflow
```bash
git add .
git commit -m "Update: description"
git push origin main
# Vercel redeploys automatically!
```

## 🔄 Future Enhancements
- [ ] Blog section
- [ ] Testimonials
- [ ] More animations
- [ ] PWA support
- [ ] CMS integration

## 📊 Performance Stats
- Lighthouse Score: 90+
- Build Time: < 5 seconds
- Bundle Size: ~150KB gzipped
- FCP: < 1 second
- TTI: < 2 seconds

## 📚 Resources
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/improvement`
3. Make changes
4. Commit: `git commit -m "Add: description"`
5. Push: `git push origin feature/improvement`
6. Open Pull Request

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Rishabh Rajak**
- 🔗 GitHub: https://github.com/Rishabh028
- 🌍 Portfolio: https://portfolio-200-nwokipe7m-rishabh028s-projects.vercel.app/
- 🎓 IIT Guwahati

## 🙏 Acknowledgments

- **React** - UI framework
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Vercel** - Seamless deployment
- **shadcn/ui** - Beautiful component patterns

---

**Made with ❤️ by Rishabh Rajak**

✨ [Live Demo](https://portfolio0028.netlify.app/) | 📦 [GitHub](https://github.com/Rishabh028/Portfolio-2.0) | 🎨 [Portfolio](https://portfolio0028.netlify.app/)
