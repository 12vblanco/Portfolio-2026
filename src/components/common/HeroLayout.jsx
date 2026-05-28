import styled from 'styled-components';

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 80px 32px;
  margin-top: -4rem;

  @media (max-width: 968px) {
    margin-top: -2rem;
    min-height: 84vh !important;
    padding: 1rem;
  }
`;

export const HeroContainer = styled.div`
  max-width: ${p => p.$maxWidth || '986px'};
  min-height: 426px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;

  @media (max-width: 968px) {
    padding: 4rem 1rem 0 1rem;
    width: fit-content;
  }
  @media (max-width: 426px) {
    width: 100%;
  }
`;

export const HeroContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const HeroLeftColumn = styled.div`
  max-width: 420px;
`;

export const HeroRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  width: 480px;

  @media (max-width: 968px) {
    align-items: flex-start;
    width: 100%;
  }
  @media (max-width: 432px) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #282828;
  max-width: 540px;
  margin-bottom: 0;

  strong {
    font-weight: 700;
    color: #282828;
  }

  @media (max-width: 968px) {
    font-size: 18px;
  }
`;
