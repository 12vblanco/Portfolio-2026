// src/components/case-studies/ProgressIndicator.jsx
import styled from "styled-components";

const ProgressIndicator = ({ progress, onProgressClick, currentIndex, totalItems }) => {
  return (
    <ScrollProgress 
      onMouseDown={onProgressClick}
      data-progress-bar
    >
      <ProgressBar style={{ width: `${progress}%` }} />
      
      {Array.from({ length: totalItems }).map((_, index) => {
        const position = totalItems > 1 ? (index / (totalItems - 1)) * 100 : 0;
        const isActive = index === currentIndex;
        
        return (
          <ProgressDot 
            key={index} 
            style={{ left: `${position}%` }}
            $isActive={isActive}
            onClick={(e) => {
              e.stopPropagation();
              // Create a synthetic event to simulate click on progress bar
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              const fakeEvent = {
                clientX: rect.left + (rect.width * (index / (totalItems - 1))),
                currentTarget: e.currentTarget.parentElement
              };
              onProgressClick(fakeEvent);
            }}
          />
        );
      })}
    </ScrollProgress>
  );
};

export default ProgressIndicator;

const ScrollProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 60%;
  margin: 0 auto;
  background: rgba(255, 56, 99, 0.2);
  overflow: visible;
  z-index: 5;
  cursor: pointer;
  transition: height 0.2s ease;
  user-select: none;
  border-radius: 2px;
  
  &:hover {
    height: 6px;
  }
  
  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: 768px) {
    width: 80%;
    height: 2px;
    
    &:hover {
      height: 4px;
    }
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #FF3863, #FF8A9F);
  width: 0%;
  transition: width 0.1s ease;
  border-radius: 2px;
  
  @media (prefers-reduced-motion: reduce) {
    transition: width 0.3s ease;
  }
`;

const ProgressDot = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#FF3863' : 'rgba(255, 56, 99, 0.5)'};
  border: 2px solid #FFFEFA;
  transition: all 0.2s ease;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(40, 40, 40, 0.2);
  
  &:hover {
    width: 16px;
    height: 16px;
    background: #FF3863;
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    border-width: 1.5px;
  }
`;