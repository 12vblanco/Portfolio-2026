import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { faqHeader, faqsData } from './pendoData';

export const PendoFAQ = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalCards = cardsRef.current.length;
    
    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      
      // Calculate scroll progress within the sticky range
      let progress = 0;
      
      if (sectionTop < 0 && sectionTop > -sectionHeight + viewportHeight) {
        // We're in the sticky scroll range
        progress = Math.abs(sectionTop) / (sectionHeight - viewportHeight);
        progress = Math.min(1, Math.max(0, progress));
      } else if (sectionTop <= -sectionHeight + viewportHeight) {
        // Fully scrolled past the sticky section
        progress = 1;
      }
      
      // Animate each card based on progress
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Reverse the order - last card should animate first (stack on top)
        const reversedIndex = totalCards - 1 - index;
        
        // Each card has its own progress range
        const cardStart = reversedIndex / totalCards;
        const cardEnd = (reversedIndex + 1) / totalCards;
        
        let cardProgress = 0;
        if (progress >= cardStart) {
          cardProgress = Math.min(1, (progress - cardStart) / (cardEnd - cardStart));
        }
        
        // Calculate transform values
        // At 0: card is at original position (centered)
        // At 1: card is stacked on top of previous cards
        
        const stackOffset = index * -24; // -24px gap when stacked, each card stacks higher
        
        // Calculate scale - slightly smaller as they stack
        const scale = 1 - (cardProgress * 0.03); // Max 3% scale reduction
        
        // Calculate opacity - fully visible at the end
        const opacity = Math.min(1, cardProgress * 1.5);
        
        // Calculate z-index - higher index on top when stacked
        const zIndex = cardProgress > 0.8 ? totalCards - index : index;
        
        // Apply transform - cards stack upward
        const translateY = stackOffset * cardProgress;
        
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PendoFAQSection ref={sectionRef}>
      <PendoFAQContainer ref={containerRef}>
        <PendoFAQHeader>
          <PendoFAQHeaderLeft>
            <PendoFAQLabel>{faqHeader.label}</PendoFAQLabel>
            <PendoFAQTitle>{faqHeader.title}</PendoFAQTitle>
          </PendoFAQHeaderLeft>
          {faqHeader.subtitle && (
            <PendoFAQSubtitle>{faqHeader.subtitle}</PendoFAQSubtitle>
          )}
        </PendoFAQHeader>

        <PendoFAQStackContainer>
          {faqsData.map((faq, i) => (
            <PendoFAQItemWrapper
              key={i}
              ref={el => cardsRef.current[i] = el}
              $index={i}
              $total={faqsData.length}
            >
              <PendoFAQItem>
                <PendoFAQQuestion>{faq.q}</PendoFAQQuestion>
                <PendoFAQAnswer>{faq.a}</PendoFAQAnswer>
              </PendoFAQItem>
            </PendoFAQItemWrapper>
          ))}
        </PendoFAQStackContainer>
      </PendoFAQContainer>
    </PendoFAQSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoFAQSection = styled.section`
  position: relative;
  min-height: 200vh;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  
  @media (max-width: 768px) { 
    min-height: 150vh;
  }
`;

const PendoFAQContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 136px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    padding: 5rem 2rem 5rem 6rem;
  }
  @media (max-width: 426px) {
    padding: 5rem 2rem;
  }
`;

const PendoFAQHeader = styled.div`
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  z-index: 100;
  position: relative;
  width: 100%;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
`;

const PendoFAQHeaderLeft = styled.div``;

const PendoFAQLabel = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
`;

const PendoFAQTitle = styled.h2`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
  letter-spacing: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const PendoFAQSubtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 460px;

  @media (max-width: 968px) {
    font-size: 18px;
    max-width: 100%;
  }
`;

const PendoFAQStackContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const PendoFAQItemWrapper = styled.div`
  width: 100%;
  transition: all 0.1s linear;
  will-change: transform, opacity;
  position: absolute;
  top: 20%;
  left: 0;
  transform: translateY(-50%);
  transform-origin: center center;
  
  /* Stack from bottom - first card starts at bottom */
  &:first-child {
    z-index: 1;
  }
  
  &:nth-child(2) {
    z-index: 2;
  }
  
  &:nth-child(3) {
    z-index: 3;
  }
  
  &:nth-child(4) {
    z-index: 4;
  }
  
  &:nth-child(5) {
    z-index: 5;
  }
  
  &:nth-child(6) {
    z-index: 6;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PendoFAQItem = styled.div`
  padding: 3.2rem 2rem;
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 20px rgba(40, 40, 40, 0.08);
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 30px rgba(40, 40, 40, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
  }
`;

const PendoFAQQuestion = styled.h3`
  font-size: 31px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const PendoFAQAnswer = styled.p`
  font-size: 20px;
  line-height: 1.7;
  color: #555;
  margin: 0;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
`;