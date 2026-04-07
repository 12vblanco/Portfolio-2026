// src/data/caseStudies.js
import lmdVideo from '../../assets/case-studies/lmdouglas.mp4';
import lmdouglas from '../../assets/case-studies/lmdouglas.png';
import lokaVideo from '../../assets/case-studies/loka.mp4';
import lokaImage from '../../assets/case-studies/loka1.png';
import omsImage from '../../assets/case-studies/oms1.png';
import pendoPush from '../../assets/case-studies/pendo-push.png';
import sujinVideo from '../../assets/case-studies/sujik.mp4';
import sujinImage from '../../assets/case-studies/sujin.jpg';

export const caseStudies = [
 {
  id: 1,
  title: "Design and Perspective",
  client: "Sujin Kim",
  shortDescription: "Graphic designer's portfolio, built using React 19 & showcasing GSAP animations and innovative navigation",
  description: "Sujin had a clear vision for her portfolio. It reflected her sensibility, letting her work take center stage. She sent me a polished Figma design and precise requirements, removing much of the guessing from the development.\n\nHer designs translated into a custom React application that respects her vision while adding interactive depth. Complex animations and unconventional navigation patterns create an experience that feels as considered as her design work.\n\nThe result does exactly what Sujin needed and gets out of the way while making her work look its best. Clean execution of a clear vision",
  image: sujinImage,
  video: sujinVideo,
  tags: ["React", "GSAP", "Web Development"],
  year: "2024",
},
  {
  id: 2,
  title: "Fantasy Author Website",
  client: "LM Douglas",
  shortDescription: "Custom Vue website merging author platform and world hub that includes new titles plus exclusive content enriching the fantasy universe for dedicated readers",
  description: "As LM Douglas' book catalog expanded, she needed more than a promotional site. Her fantasy world kept on growing with maps, character backstories—but and designs and the website was the perfect place to showcase it all.\n\nI redesigned and built a custom Vue application that serves as professional author platform showcasing her growing catalog, and an immersive portal into her fantasy world.\n\n This transformed a static author site into a living world that grows with each release. Readers now have a destination to dive deeper between books, strengthening engagement and loyalty. The platform is ready to scale with whatever world-building she envisions next",
  image: lmdouglas,
  video: lmdVideo,
  tags: ["Vue", "Figma", "UI/UX Design"],
  year: "2024",
},
 {
  id: 3,
  title: "Website Re-Design",
  client: "Orders Made Simple",
  shortDescription: "Marketing website redesign restoring the company's distinctive visual identity. Returned to the unique style that originally set them apart in the SaaS space",
  description: "OMS' website had drifted from the distinctive design that made them recognizable. Years of incremental updates diluted their unique visual identity, making them blend in with generic SaaS competitors.\n\nAs a former frontend developer and designer for OMS, I understand their original design DNA. Led complete marketing website redesign and deployment, reclaiming the clean aesthetic that once differentiated them while modernizing for current standards.\n\n The redesign presents a cohesive, memorable identity to new prospects ",
  image: omsImage,
  tags: ["Brand Redesign", "Figma", "UI/UX Design"],
  year: "2025 - 2026",
},
 {
  id: 4,
  title: "Healthcare Website in WIX",
  client: "Loka Care",
  shortDescription: "Design-as-filter recruiting site for specialized caregiver roles. Intentional calm aesthetics attracted right candidates while deterring misaligned applicants",
  description: "Loka Care needed caregivers for a young adult. Traditional job postings attracted quantity over quality. Applicants who didn't understand the role's patient, focused nature.\n\nDesigned a website where the aesthetic itself acted as a pre-screening tool. Calm color palette, deliberate pacing, and thoughtful typography created an environment that resonated with patient, attentive candidates while naturally filtering out those seeking fast-paced work.\n\nThe aim was to filter applicants before they even applied. Candidates who connected with the site's intentional calm were exactly the personalities suited for the role",
  image: lokaImage,
  video: lokaVideo,
  tags: ["UI/UX Design", "Healthcare", "Wix"],
  year: "2025",
},
{
  id: 5,
  title: "Pendo Audit and Management",
  client: "The PUSH Agency",
  shortDescription: "Complete analytics from 0 for talent platform. 50% increase in assignment creation, 70% in reports, and 32 user guides and comprehensive tracking infrastructure",
  description: "The PUSH Agency had little visibility into user engagement on their talent platform, no analytics, no tracking, no way to identify friction or measure adoption.\n\nI helped them build a Pendo infrastructure: 32 guides, 38 tracked features, 15 dashboards, 51 reports, and comprehensive user journey analysis.\n\nWe performed assignment creation: +52% (33%→50%)\nand kickstarted report generation: +37% (51%→70%)\n\n Thanks to all this we activated dormant features, reduced navigation time 34%, and established data-driven optimization framework for ongoing improvement",
  image: pendoPush,
  tags: ["Pendo", "Analytics", "Optimization"],
  year: "2025 - 2026",
}
];