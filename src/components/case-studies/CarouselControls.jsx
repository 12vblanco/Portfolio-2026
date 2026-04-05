// src/components/case-studies/CarouselControls.js
import styled from 'styled-components';

const CarouselControls = ({ onPrev, onNext, canScrollLeft, canScrollRight }) => {
  return (
    <ControlsContainer>
      <ArrowButton 
        onClick={onPrev}
        disabled={!canScrollLeft}
        aria-label="Previous case study"
      >
        <svg width="34" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ArrowButton>

      <ArrowButton 
        onClick={onNext}
        disabled={!canScrollRight}
        aria-label="Next case study"
      >
        <svg width="34" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ArrowButton>
    </ControlsContainer>
  );
};

export default CarouselControls;

// ─── Styled Components ────────────────────────────────────────────────────────

const ControlsContainer = styled.div.attrs({ className: 'carouselControls-ControlsContainer' })`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled.button.attrs({ className: 'carouselControls-ArrowButton' })`
  width: 58px;
  height: 58px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 56, 99, 1);
  border-radius: 50%;
  color: rgb(255, 56, 99);
  box-shadow: 0 4px 12px rgba(40, 40, 40, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 8px 24px rgba(40, 40, 40, 0.15);
    background: #FF3863;
    color: #FFFEFA;
    border-color: #FF3863;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
