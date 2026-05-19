# WeIntern Internship Task - Full Stack Web Dev

## 📁 Project Structure
weintern-internship/
├── index.html # Main HTML structure with semantic tags
├── style.css # Responsive styling (Flexbox, Grid, Media Queries)
└── script.js # Interactive features (mobile menu, back-to-top, CTA alerts)


## 🎨 Code Structure & Design Decisions

### HTML Structure
- **Semantic HTML5** - Used `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` for better accessibility and SEO
- **Four Required Sections**:
  - `#hero` - WeIntern branding, tagline, and CTA button
  - `#about` - Mission, vision, and 3 value proposition cards
  - `#internships` - Available tracks (AI, Data Science, Web Dev) with duration & eligibility
  - `#cta` - Bold "Apply Now" button with call-to-action
- **Meaningful class names** (`.hero-section`, `.cta-btn`, `.intern-card`) for clean, maintainable code

### CSS & Responsive Design
- **Mobile-First Approach** - Base styles for all devices, then enhanced for larger screens
- **Flexbox & Grid** - Used for flexible layouts (`display: flex`, `display: grid`) in cards and navigation
- **Media Query Breakpoint** - `@media (max-width: 768px)` stacks all columns vertically on mobile/tablet
- **Brand Colors** (as specified):
  - Navy: `#0A1628` (headers, footer, hero background)
  - Blue: `#2563EB` (buttons, accents, links)
  - Gold: `#F59E0B` (highlights, special badges)
- **Google Fonts** - Poppins (headings) + Inter (body text) for modern, clean typography
- **Viewport Meta Tag** - `<meta name="viewport" content="width=device-width, initial-scale=1.0">` for proper scaling on mobile

### JavaScript Interactivity
- **Mobile Menu Toggle** - Hamburger menu expands/collapses navigation on small screens
- **Back-to-Top Button** - Appears after scrolling 400px, smooth scroll to top
- **CTA Button Alerts** - Shows friendly confirmation message when "Apply Now" is clicked
- **Smooth Scrolling** - Internal anchor links scroll smoothly between sections
- **Responsive Reset** - Automatically resets mobile menu style when window resizes above 768px

## 📱 Responsive Testing
- ✅ Desktop (1280px+) - Horizontal row layout with side-by-side cards
- ✅ Tablet (768px-1024px) - Flexible grid with 2-column layout where possible
- ✅ Mobile (below 768px) - All sections stack vertically, buttons full-width, readable typography

## 🚀 How to Run
1. Clone this repository
2. Open `index.html` in any modern browser
3. Or use Live Server in VS Code for best experience

## 📸 Screenshots
| Desktop View | Mobile View |
|--------------|--------------|
| *(Add your desktop screenshot here)* | *(Add your mobile screenshot here)* |

## ✅ Checklist
- [x] All 4 sections (Hero, About, Internship, CTA)
- [x] Responsive on desktop & mobile
- [x] Semantic HTML5 tags
- [x] Brand colors applied
- [x] Interactive JavaScript features
- [x] Google Fonts integrated

---

**Submitted by:** [Your Name]  
**Date:** May 2026  
**Track:** Full Stack Web Dev Intern
