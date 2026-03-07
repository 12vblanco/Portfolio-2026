// src/data/caseStudies.js
import lokaImage from '../../assets/case-studies/loka1.png';
import omsImage from '../../assets/case-studies/oms1.jpg';
import sujinVideo from '../../assets/case-studies/sujik.mp4';
import sujinImage from '../../assets/case-studies/sujin.jpg';

export const caseStudies = [
  {
    id: 1,
    title: "Design and Perspective",
    client: "Sujin Kim",
    shortDescription: "A comprehensive design system that transforms how users interact with digital products.",
    description: "A comprehensive design system that transforms how users interact with digital products...",
    image: sujinImage,
    video: sujinVideo,
    tags: ["UI/UX Design", "Brand Identity", "Web Design"],
    year: "2024",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "Website Re-Design",
    client: "Orders Made Simple",
    shortDescription: "Streamlined order management system with real-time tracking and analytics dashboard. Reduced processing time.",
    description: "Streamlined order management system with real-time tracking and analytics dashboard. Reduced processing time by 40% and improved customer satisfaction scores. Streamlined order management system with real-time tracking and analytics dashboard. Reduced processing time by 40% and improved customer satisfaction scores. Streamlined order management system with real-time tracking and analytics dashboard. Reduced processing time by 40% and improved customer satisfaction scores.",
    image: omsImage,
    tags: ["Product Design", "SaaS", "Dashboard"],
    year: "2023",
    color: "#10B981"
  },
  {
    id: 3,
    title: "Healthcare Startup",
    client: "Loka Care",
    shortDescription: "Mobile-first healthcare application connecting patients with specialized care providers.",
    description: "Mobile-first healthcare application connecting patients with specialized care providers. Implemented secure messaging and appointment scheduling features. Mobile-first healthcare application connecting patients with specialized care providers. Implemented secure messaging and appointment scheduling features. Mobile-first healthcare application connecting patients with specialized care providers. Implemented secure messaging and appointment scheduling features.",
    image: lokaImage,
    video: null,
    tags: ["Mobile App", "Healthcare", "React Native"],
    year: "2024",
    color: "#8B5CF6"
  },
  {
    id: 4,
    title: "Project Alpha",
    client: "Tech Corporation",
    shortDescription: "Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence.",
    description: "Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence.Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence. Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence. Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=360&fit=crop",
    tags: ["Data Visualization", "Enterprise", "React"],
    year: "2023",
    color: "#F59E0B"
  },
  {
    id: 5,
    title: "Urban Planner",
    client: "City Development",
    shortDescription: "Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development.",
    description: "Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development. Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development. Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development. Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=480&h=360&fit=crop",
    tags: ["3D Modeling", "Civic Tech", "WebGL"],
    year: "2024",
    color: "#3B82F6"
  }
];