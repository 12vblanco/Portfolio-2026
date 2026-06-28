import lmdouglasMobileJpg from "../../../assets/case-studies/lmdouglas-M.jpg";
import lmdouglasMobile from "../../../assets/case-studies/lmdouglas-M.webp";
import lmdouglasJpg from "../../../assets/case-studies/lmdouglas.jpg";
import lmdVideo from "../../../assets/case-studies/lmdouglas.mp4";
import lmdouglas from "../../../assets/case-studies/lmdouglas.webp";
import lokaMobileJpg from "../../../assets/case-studies/loka-M.jpg";
import lokaMobile from "../../../assets/case-studies/loka-M.webp";
import lokaVideo from "../../../assets/case-studies/loka.mp4";
import lokaImageJpg from "../../../assets/case-studies/loka1.jpg";
import lokaImage from "../../../assets/case-studies/loka1.webp";
import omsMobileJpg from "../../../assets/case-studies/oms-M.jpg";
import omsMobile from "../../../assets/case-studies/oms-M.webp";
import omsImageJpg from "../../../assets/case-studies/oms1.jpg";
import omsImage from "../../../assets/case-studies/oms1.webp";
import orchardMobileJpg from "../../../assets/case-studies/orchard-M.jpg";
import orchardMobile from "../../../assets/case-studies/orchard-M.webp";
import orchardJpg from "../../../assets/case-studies/orchard.jpg";
import orchardVideo from "../../../assets/case-studies/orchard.mp4";
import orchard from "../../../assets/case-studies/orchard.webp";
import pendoPushMobileJpg from "../../../assets/case-studies/pendo-push-M.jpg";
import pendoPushMobile from "../../../assets/case-studies/pendo-push-M.webp";
import pendoPushJpg from "../../../assets/case-studies/pendo-push.jpg";
import pendoPush from "../../../assets/case-studies/pendo-push.webp";
import sujinVideo from "../../../assets/case-studies/sujik.mp4";
import sujinMobileJpg from "../../../assets/case-studies/sujin-M.jpg";
import sujinMobile from "../../../assets/case-studies/sujin-M.webp";
import sujinImageJpg from "../../../assets/case-studies/sujin.jpg";
import sujinImage from "../../../assets/case-studies/sujin.webp";

export const caseStudies = [
  {
    id: 6,
    title: "Bar & Restaurant Website",
    client: "The Orchard Bar",
    shortDescription:
      "React & Typescript website for The Orchard in Edinburgh. It has a table booking system embedded into the page, a dynamic menu, and a fast, fully responsive experience",
    description:
      "The Orchard Bar is a warm Pub and Restaurant in the Canonmills neighbourhood of Edinburgh, just a few meters away from The Royal Botanical. They were my first client when I started offering freelance services back in 2019 and I have managed their site since. Their main 3 requests were to be have a responsive website that allowed their patrons to book a table and where they could advertise their menus.\n\nThe website is a fast React 19 and TypeScript application, with a photographic hero, a dynamically generated menu that changes seasonally, and clear contact details, with the TableSense reservation system wired directly into the page so guests can check availability and book a table directly from the site",
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
      "Custom Vue website merging author platform and world hub that includes new titles plus exclusive content enriching the fantasy universe for dedicated readers",
    description:
      "As LM Douglas' book catalog expanded, she needed more than a promotional site. Her fantasy world kept on growing with maps, character backstories and designs, and the website was the perfect place to showcase it all.\n\nI redesigned and built a custom Vue application that serves as professional author platform showcasing her growing catalog, and an immersive portal into her fantasy world.\n\n This transformed a static author site into a living world that grows with each release. Readers now have a destination to dive deeper between books, strengthening engagement and loyalty. The platform is ready to scale with whatever world-building she envisions next",
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
      "OMS' website had drifted from the distinctive design that made them recognizable. Years of incremental updates diluted their unique visual identity, making them blend in with generic SaaS competitors.\n\nAs a former frontend developer and designer for OMS, I understand their original design DNA. Led complete marketing website redesign and deployment, reclaiming the clean aesthetic that once differentiated them while modernizing for current standards.\n\n The redesign presents a cohesive, memorable identity to new prospects",
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
      "Sujin had a clear vision for her portfolio. It reflected her sensibility, letting her work take center stage. She sent me a polished Figma design and precise requirements, removing much of the guessing from the development.\n\nHer designs translated into a custom React application that respects her vision while adding interactive depth. Complex animations and unconventional navigation patterns create an experience that feels as considered as her design work.\n\nThe result does exactly what Sujin needed and gets out of the way while making her work look its best. Clean execution of a clear vision",
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
      "Loka Care needed caregivers for a young adult. Traditional job postings attracted quantity over quality. Applicants who didn't understand the role's patient, focused nature.\n\nDesigned a website where the aesthetic itself acted as a pre-screening tool. Calm color palette, deliberate pacing, and thoughtful typography created an environment that resonated with patient, attentive candidates while naturally filtering out those seeking fast-paced work.\n\nThe aim was to filter applicants before they even applied. Candidates who connected with the site's intentional calm were exactly the personalities suited for the role",
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
      "Complete analytics from 0 for talent platform. 50% increase in assignment creation, 70% in reports, and 32 user guides and comprehensive tracking infrastructure",
    description:
      "The PUSH Agency had little visibility into user engagement on their talent platform, no analytics, no tracking, no way to identify friction or measure adoption.\n\nI helped them build a Pendo infrastructure: 32 guides, 38 tracked features, 15 dashboards, 51 reports, and comprehensive user journey analysis.\n\nWe performed assignment creation: +52% (33%→50%)\nand kickstarted report generation: +37% (51%→70%)\n\n Thanks to all this we activated dormant features, reduced navigation time 34%, and established data-driven optimization framework for ongoing improvement",
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
