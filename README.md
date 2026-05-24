# victorblancoweb.com

Personal portfolio and freelance consulting site for **Victor Blanco** — Edinburgh-based frontend developer, designer, and Pendo consultant.

Built with React 19, Vite, and a focus on smooth, animated user experiences.

🌐 [victorblancoweb.com](https://victorblancoweb.com)

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — intro, skills, case studies, testimonials, contact |
| `/pendo-consultant` | Dedicated landing page for Pendo consulting services |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite |
| Styling | styled-components |
| Animation | GSAP |
| Smooth Scroll | Lenis |
| Routing | React Router |
| Deployment | — |

---

## Features

- Smooth scroll with section snapping via Lenis + custom hooks
- GSAP-powered animations and scroll-triggered transitions
- Animated components: testimonials carousel, horizontal case studies carousel, hero stamp, PendoDiscoveryCTA with looping animated border
- Dedicated `/pendo-consultant` page optimised for Pendo-related search traffic
- JSON-LD structured data for SEO
- Static SEO fallback div for Googlebot rendering
- `sitemap.xml` submitted to Google Search Console
- Fully responsive layout

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/victorblanco/victorblancoweb.git
cd victorblancoweb

# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to the `/dist` folder, ready to deploy.

---

## Project Structure

```
victorblancoweb/
├── public/
│   └── sitemap.xml
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level page components
│   │   ├── Home.jsx
│   │   └── PendoConsultant.jsx
│   ├── data/             # Case studies and content data
│   ├── hooks/            # Custom React hooks (scroll, snap, etc.)
│   ├── styles/           # Global styles and theme tokens
│   └── main.jsx          # App entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## SEO

- XML sitemap at `/sitemap.xml`, submitted to Google Search Console
- JSON-LD structured data (Person + WebSite schema)
- Static SEO fallback content for Googlebot (React hydration workaround)
- Keyword strategy targeting Pendo consulting and frontend development terms

---

## Contact

**Victor Blanco**
Edinburgh, Scotland

- 🌐 [victorblancoweb.com](https://victorblancoweb.com)
- 💼 [LinkedIn](https://linkedin.com/in/victorblanco)
- 📧 Available via the contact form on-site

---

## Licence

This project is personal and not open for redistribution. Feel free to take inspiration, but please don't clone or repurpose the design or content directly.
