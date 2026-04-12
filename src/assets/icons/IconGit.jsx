// src/assets/icons/IconGit.jsx
export const IconGit = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Git">
    {/* Branch node top */}
    <circle cx="32" cy="10" r="4" stroke="#282828" strokeWidth="2.5"/>
    {/* Commit node middle */}
    <circle cx="14" cy="22" r="4" stroke="#282828" strokeWidth="2.5"/>
    {/* Commit node bottom */}
    <circle cx="14" cy="36" r="4" stroke="#282828" strokeWidth="2.5"/>
    {/* Main trunk */}
    <line x1="14" y1="26" x2="14" y2="32" stroke="#282828" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Branch line from trunk to top-right node */}
    <path d="M14 18V14C14 12 15.5 10.5 17 10H28" stroke="#282828" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Branch merge back */}
    <path d="M32 14V22C32 24 30.5 26 28 26H18" stroke="#282828" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
