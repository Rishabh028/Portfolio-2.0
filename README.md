# My Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Beautiful and clean UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speed
- 🎯 **Smooth Navigation** - Sticky navbar with smooth scroll behavior
- 📧 **Contact Form** - Functional contact form to receive messages
- 🎭 **Animations** - Engaging animations and transitions throughout
- 🌙 **Dark Theme** - Eye-friendly dark color scheme

## Pages & Sections

- **Hero** - Eye-catching introduction section
- **About** - Personal bio and statistics
- **Skills** - Technical skills with proficiency levels
- **Projects** - Showcase of featured and all projects
- **Contact** - Contact information and message form
- **Footer** - Quick links and social media

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Language**: JavaScript (JSX)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── Footer.jsx           # Footer component
│   └── sections/
│       ├── Hero.jsx         # Hero section
│       ├── About.jsx        # About section
│       ├── Skills.jsx       # Skills section
│       ├── Projects.jsx     # Projects section
│       └── Contact.jsx      # Contact section
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css               # Global styles

public/                     # Static files
```

## Customization

### Update Personal Information

Edit the following files to add your personal information:

1. **Hero Section** - `src/components/sections/Hero.jsx`
   - Change name, title, and description
   - Update social media links

2. **About Section** - `src/components/sections/About.jsx`
   - Update bio and statistics

3. **Skills Section** - `src/components/sections/Skills.jsx`
   - Modify skills and proficiency levels

4. **Projects Section** - `src/components/sections/Projects.jsx`
   - Add your own projects

5. **Contact Section** - `src/components/sections/Contact.jsx`
   - Update contact information
   - Configure form submission

### Colors and Theme

Modify the Tailwind configuration in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1F2937',      // Dark gray
      secondary: '#3B82F6',    // Blue
      accent: '#F59E0B',       // Amber
    },
  },
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Images** - Optimize images before adding them
2. **Lazy Loading** - Consider implementing lazy loading for images
3. **Code Splitting** - Use React.lazy() for route-based code splitting
4. **SEO** - Add meta tags for better search engine optimization

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Netlify
Connect your GitHub repository to Netlify for automatic deployments.

### GitHub Pages
Configure `vite.config.ts` with proper base path and deploy the `dist` folder.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, feel free to open an issue or contact me through the portfolio contact form.

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
