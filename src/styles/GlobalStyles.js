import { createGlobalStyle } from 'styled-components';

// Major Third Scale (1.25 ratio) - Base 16px
// 16, 20, 25, 31.25, 39.06, 48.83, 61.04, 76.29
export const theme = {
  colors: {
    bgPage: '#FAFAFA',
    bgCard: '#FFFEFA',
    bgDark: '#282828',
    textPrimary: '#282828333',
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
    xs: '12.8px',      // 16 / 1.25
    sm: '16px',        // Base
    base: '20px',      // 16 * 1.25
    lg: '25px',        // 20 * 1.25
    xl: '31.25px',     // 25 * 1.25
    '2xl': '39.06px',  // 31.25 * 1.25
    '3xl': '48.83px',  // 39.06 * 1.25
    '4xl': '61.04px',  // 48.83 * 1.25
    '5xl': '76.29px',  // 61.04 * 1.25
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

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { 
    scroll-behavior: smooth; 
    font-size: 16px;
  }

  body {
    font-family: 'Switzer', sans-serif;
    background-color: #FAFAFA;
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 3rem 3rem;
    background-attachment: fixed;
    color: #282828;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    position: relative;
    z-index: 1;
  }

  // Major Third Typography Scale
  h1 {
    font-family: 'Switzer', sans-serif;
    font-size: 95px;  // 6xl
    font-weight: 900;
    line-height: 1.1;
    color: #282828;
  }
  
  h2 {
    font-family: 'Switzer', sans-serif;
    font-size: 61.04px;  // 4xl
    font-weight: 700;
    line-height: 1.15;
    color: #282828;
    letter-spacing: -2px;
  }
  
  h3 {
    font-family: 'Switzer', sans-serif;
    font-size: 48.83px;  // 3xl
    font-weight: 700;
    line-height: 1.2;
    color: #282828;
        letter-spacing: -1px;

  }
  
  h4 {
    font-family: 'Switzer', sans-serif;
    font-size: 39.06px;  // 2xl
    font-weight: 600;
    line-height: 1.25;
    color: #282828;
  }
  
  h5 {
    font-family: 'Switzer', sans-serif;
    font-size: 31.25px;  // xl
    font-weight: 600;
    line-height: 1.3;
    color: #282828;
  }
  
  h6 {
    font-family: 'Switzer', sans-serif;
    font-size: 25px;  // lg
    font-weight: 600;
    line-height: 1.35;
    color: #282828;
  }
  
  p {
    font-size: 20px;  // base
    line-height: 1.6;
  }
  
  small {
    font-size: 16px;  // sm
  }
`;
