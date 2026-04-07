import { createGlobalStyle } from 'styled-components';

// Major Third Scale (1.25 ratio) - Base 16px
// 16, 20, 25, 31.25, 39.06, 48.83, 61.04, 76.29
export const theme = {
  colors: {
    bgPage: '#FAFAFA',
    bgCard: '#FFFEFA',
    bgDark: '#282828',
    textPrimary: '#282828',
    textHeading: '#282828',
    actionPrimary: '#FF3863',
    border: '#e5e5e5',
  },
  // 8px Grid System
  spacing: {
    '0': '0px',
    '1': '8px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '5': '40px',
    '6': '48px',
    '7': '56px',
    '8': '64px',
    '9': '72px',
    '10': '80px',
    '12': '96px',
    '14': '112px',
    '16': '128px',
    '20': '160px',
    '24': '192px',
  },
  // Major Third Typography Scale (1.25)
  typography: {
    xs: '12.8px',
    sm: '16px',
    base: '20px',
    lg: '25px',
    xl: '31.25px',
    '2xl': '39.06px',
    '3xl': '48.83px',
    '4xl': '61.04px',
    '5xl': '76.29px',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '50%',
  },
};

export const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    overflow-x: hidden;
    overscroll-behavior: none;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: 'Switzer', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    color: #282828;
    background-color: #FAFAFA;
    background-image:
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 3rem 3rem;
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overscroll-behavior: none;
    touch-action: manipulation;
  }

  #root {
    width: 100%;
    overflow-x: clip;
  }

  h1 {
    font-family: 'Switzer', sans-serif;
    font-size: 95px;
    font-weight: 900;
    line-height: 1.1;
    color: #282828;
  }

  h2 {
    font-family: 'Switzer', sans-serif;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 1.15;
    color: #282828;
    letter-spacing: -2px;
  }

  h3 {
    font-family: 'Switzer', sans-serif;
    font-size: 48.83px;
    font-weight: 700;
    line-height: 1.2;
    color: #282828;
    letter-spacing: -1px;
  }

  h4 {
    font-family: 'Switzer', sans-serif;
    font-size: 39.06px;
    font-weight: 600;
    line-height: 1.25;
    color: #282828;
  }

  h5 {
    font-family: 'Switzer', sans-serif;
    font-size: 31.25px;
    font-weight: 600;
    line-height: 1.3;
    color: #282828;
  }

  h6 {
    font-family: 'Switzer', sans-serif;
    font-size: 25px;
    font-weight: 600;
    line-height: 1.35;
    color: #282828;
  }

  p {
    font-size: 20px;
    line-height: 1.6;
      letter-spacing: -.2px;
  }

  small {
    font-size: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
    touch-action: manipulation;
  }

  button {
    font-family: 'Switzer', sans-serif;
    cursor: pointer;
    touch-action: manipulation;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  /* ── Responsive Typography ── */

  @media (max-width: 1024px) {
    h1 { font-size: 76.29px; }
    h2 { font-size: 48.83px; }
    h3 { font-size: 39.06px; }
    h4 { font-size: 31.25px; }
    h5 { font-size: 25px; }
    h6 { font-size: 20px; }
  }

  @media (max-width: 768px) {
    h1 { font-size: 61.04px; }
    h2 { font-size: 39.06px; }
    h3 { font-size: 31.25px; }
    h4 { font-size: 25px; }
    h5 { font-size: 20px; }
    h6 { font-size: 16px; }
    p  { font-size: 18px; }
  }

  @media (max-width: 480px) {
    h1 { font-size: 42px; }
    h2 { font-size: 30px; }
    h3 { font-size: 25px; }
    h4 { font-size: 20px; }
    h5 { font-size: 16px; }
    h6 { font-size: 16px; }
    p  { font-size: 16px; }
  }
`;