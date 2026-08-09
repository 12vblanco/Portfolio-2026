import lmdouglasMobileJpg from "../../../assets/case-studies/lmdouglas/lmdouglas-M.jpg";
import lmdouglasMobile from "../../../assets/case-studies/lmdouglas/lmdouglas-M.webp";
import lmdouglasJpg from "../../../assets/case-studies/lmdouglas/lmdouglas.jpg";
import lmdVideo from "../../../assets/case-studies/lmdouglas/lmdouglas.mp4";
import lmdouglas from "../../../assets/case-studies/lmdouglas/lmdouglas.webp";
import lokaMobileJpg from "../../../assets/case-studies/loka/loka-M.jpg";
import lokaMobile from "../../../assets/case-studies/loka/loka-M.webp";
import lokaVideo from "../../../assets/case-studies/loka/loka.mp4";
import lokaImageJpg from "../../../assets/case-studies/loka/loka1.jpg";
import lokaImage from "../../../assets/case-studies/loka/loka1.webp";
import omsMobileJpg from "../../../assets/case-studies/oms/oms-M.jpg";
import omsMobile from "../../../assets/case-studies/oms/oms-M.webp";
import omsImageJpg from "../../../assets/case-studies/oms/oms1.jpg";
import omsImage from "../../../assets/case-studies/oms/oms1.webp";
import orchardMobileJpg from "../../../assets/case-studies/orchard/orchard-M.jpg";
import orchardMobile from "../../../assets/case-studies/orchard/orchard-M.webp";
import orchardJpg from "../../../assets/case-studies/orchard/orchard.jpg";
import orchardVideo from "../../../assets/case-studies/orchard/orchard.mp4";
import orchard from "../../../assets/case-studies/orchard/orchard.webp";
import pendoPushMobileJpg from "../../../assets/case-studies/pendo-push/pendo-push-M.jpg";
import pendoPushMobile from "../../../assets/case-studies/pendo-push/pendo-push-M.webp";
import pendoPushJpg from "../../../assets/case-studies/pendo-push/pendo-push.jpg";
import pendoPush from "../../../assets/case-studies/pendo-push/pendo-push.webp";
import sujinVideo from "../../../assets/case-studies/sujin/sujik.mp4";
import sujinMobileJpg from "../../../assets/case-studies/sujin/sujin-M.jpg";
import sujinMobile from "../../../assets/case-studies/sujin/sujin-M.webp";
import sujinImageJpg from "../../../assets/case-studies/sujin/sujin.jpg";
import sujinImage from "../../../assets/case-studies/sujin/sujin.webp";

// Optional per-study field:
//   link: internal route to a full case-study page. When present, the card
//   overlay shows a "Read case study →" CTA (see CaseStudies.jsx). The Orchard
//   page is staged at /OrchardCaseStudyPage; add its link once published.
export const caseStudies = [
  {
    id: 6,
    title: "Bar & Restaurant Website",
    client: "The Orchard Bar",
    shortDescription:
      "React & TypeScript website for The Orchard in Edinburgh, with embedded table booking, a dynamic seasonal menu, and a fast, fully responsive experience",
    description:
      "The Orchard Bar is a warm pub and restaurant in Canonmills, Edinburgh, a few minutes from the Royal Botanic Garden. They were my first client when I started freelancing in 2020, and I've designed and managed their site since.\n\nThe 2026 rebuild is a fast React 19 and TypeScript site: a photographic hero, a dynamically generated seasonal menu, and the TableSense reservation system wired into the page so guests can check availability and book a table directly",
    image: orchard,
    imageFallback: orchardJpg,
    alt: "The Orchard Bar website homepage on desktop showing a full-width hero photo of the bar over a warm dark theme with the venue name and navigation",
    mobileImage: orchardMobile,
    mobileImageFallback: orchardMobileJpg,
    mobileAlt:
      "The Orchard Bar website on mobile showing the menu section and the embedded Book a Table reservation widget",
    video: orchardVideo,
    tags: ["React + TypeScript", "UX", "Vitest"],
    year: "2026",
  },
  {
    id: 2,
    title: "Fantasy Author Website",
    client: "LM Douglas",
    shortDescription:
      "Custom Vue website merging author platform and saga's hub that includes new titles plus exclusive content enriching the fantasy universe for dedicated readers",
    description:
      "As LM Douglas' book catalogue expanded, she needed more than a promotional site. Her fantasy world kept growing (maps, character backstories, designs) and the website was the perfect place to showcase it all.\n\nI redesigned and built a custom Vue application that serves as a professional author platform and an immersive portal into her fantasy world.\n\nA static author site became a living world that grows with each release, giving readers a destination between books and room to scale with whatever world-building she envisions next",
    image: lmdouglas,
    imageFallback: lmdouglasJpg,
    alt: "LM Douglas fantasy author website featuring illustrated fantasy map background and interactive book cover carousel with Vue.js components",
    objectPosition: "center calc(50% + 12px)", // nudge down ~12px so the top isn't cropped
    mobileImage: lmdouglasMobile,
    mobileImageFallback: lmdouglasMobileJpg,
    mobileAlt:
      "LM Douglas author site mobile view showing character directory navigation and exclusive content preview cards",
    video: lmdVideo,
    tags: ["Vue3", "Figma", "UI/UX Design"],
    year: "2024",
  },
  {
    id: 3,
    title: "Website Re-Design",
    client: "Orders Made Simple",
    shortDescription:
      "Marketing website redesign restoring the company's distinctive visual identity. Returned to the unique style that originally set them apart in the SaaS space",
    description:
      "OMS' website had drifted from the distinctive design that made them recognisable. Years of incremental updates had diluted their visual identity, leaving them blending in with generic SaaS competitors.\n\nAs a former frontend developer and designer for OMS, I knew their original design DNA. I led the complete redesign and deployment of their marketing site, reclaiming the clean aesthetic that once set them apart while modernising it for current standards.\n\nThe redesign presents a cohesive, memorable identity to new prospects",
    image: omsImage,
    imageFallback: omsImageJpg,
    alt: "Orders Made Simple SaaS marketing website redesign showing clean dashboard interface with brand color scheme and typography hierarchy",
    mobileImage: omsMobile,
    mobileImageFallback: omsMobileJpg,
    mobileAlt:
      "Orders Made Simple mobile responsive design showing collapsed navigation menu and feature highlight sections",
    tags: ["Brand Redesign", "UI/UX Design", "HubSpot"],
    year: "2025 - 2026",
  },
  {
    id: 1,
    title: "Design and Perspective",
    client: "Sujin Kim",
    shortDescription:
      "Graphic designer's portfolio, built using React 19 & showcasing GSAP animations and innovative navigation",
    description:
      "Sujin had a clear vision for her portfolio: it should reflect her sensibility and let her work take centre stage. She sent me a polished Figma design and precise requirements, which removed much of the guesswork from development.\n\nI translated her designs into a custom React application that respects her vision while adding interactive depth: complex animations and unconventional navigation that feel as considered as her design work.\n\nThe result does exactly what Sujin needed: it makes her work look its best, then gets out of the way. Clean execution of a clear vision",
    image: sujinImage,
    imageFallback: sujinImageJpg,
    alt: "Sujin Kim graphic design portfolio homepage showing minimalist grid layout with custom cursor and GSAP animated text reveals",
    mobileImage: sujinMobile,
    mobileImageFallback: sujinMobileJpg,
    mobileAlt:
      "Sujin Kim portfolio mobile view showing hamburger menu navigation and animated project thumbnails",
    video: sujinVideo,
    tags: ["React", "GSAP", "Web Development"],
    year: "2024",
  },
  {
    id: 4,
    title: "Healthcare Website in WIX",
    client: "Loka Care",
    shortDescription:
      "Design-as-filter recruiting site for specialized caregiver roles. Intentional calm aesthetics attracted right candidates while deterring misaligned applicants",
    description:
      "Loka Care needed caregivers for a young adult, and traditional job postings attracted quantity over quality, drawing applicants who didn't understand the role's patient, focused nature.\n\nI designed a website where the aesthetic itself acts as a pre-screening tool: a calm colour palette, deliberate pacing and thoughtful typography that resonate with attentive candidates while naturally deterring those after fast-paced work.\n\nThe aim was to filter applicants before they even applied. The candidates who connected with the site's intentional calm were exactly the personalities suited to the role",
    image: lokaImage,
    imageFallback: lokaImageJpg,
    alt: "Loka Care healthcare recruitment website with calm sage green color palette, patient-focused messaging, and caregiver application form on Wix platform",
    mobileImage: lokaMobile,
    mobileImageFallback: lokaMobileJpg,
    mobileAlt:
      "Loka Care mobile website showing simplified application flow and role description cards for caregivers",
    video: lokaVideo,
    tags: ["UI/UX Design", "Healthcare", "Wix"],
    year: "2025",
  },
  {
    id: 5,
    title: "Pendo Audit and Management",
    client: "The PUSH Agency",
    shortDescription:
      "Pendo analytics built from zero for a talent platform: 32 guides, comprehensive tracking, and measured lifts in assignment creation and reporting",
    description:
      "The PUSH Agency had little visibility into user engagement on their talent platform: no analytics, no tracking, no way to spot friction or measure adoption.\n\nI built their Pendo infrastructure from zero: 32 guides, 38 tracked features, 15 dashboards, 51 reports and comprehensive user-journey analysis.\n\nAssignment creation rose 52% (33%→50%) and report generation 37% (51%→70%). We activated dormant features, cut navigation time by 34%, and established a data-driven optimisation framework for ongoing improvement",
    image: pendoPush,
    imageFallback: pendoPushJpg,
    alt: "Pendo analytics dashboard for talent platform showing feature adoption metrics, guide performance charts, and user engagement heatmaps",
    mobileImage: pendoPushMobile,
    mobileImageFallback: pendoPushMobileJpg,
    mobileAlt:
      "Pendo mobile analytics view showing user engagement data and onboarding guide completion rates for The PUSH Agency",
    tags: ["Pendo", "Analytics", "Optimization"],
    year: "2025 - 2026",
  },
];
