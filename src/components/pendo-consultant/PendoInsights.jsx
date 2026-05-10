import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DownIcon } from '../../assets/icons/Down';
import { insightsData, insightsHeader } from './pendoInsightsData';

gsap.registerPlugin(ScrollTrigger);

export const PendoInsights = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const listRef    = useRef(null);
  const bodyRefs   = useRef([]);
  const arrowRefs  = useRef([]);

  // ── Scroll-in animation ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
          );
          gsap.fromTo(
            listRef.current.querySelectorAll('[data-insight]'),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, delay: 0.15, ease: 'power2.out' }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Accordion toggle ─────────────────────────────────────────────────────
  const handleToggle = (index) => {
    const isOpening   = openIndex !== index;
    const targetBody  = bodyRefs.current[index];
    const targetArrow = arrowRefs.current[index];

    // Close previously open item
    if (openIndex !== null && openIndex !== index) {
      const prevBody  = bodyRefs.current[openIndex];
      const prevArrow = arrowRefs.current[openIndex];
      gsap.to(prevBody, {
        height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut',
        onComplete: () => { prevBody.style.display = 'none'; },
      });
      gsap.to(prevArrow, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
    }

    if (isOpening) {
      targetBody.style.display = 'block';
      targetBody.style.height  = 'auto';
      targetBody.style.opacity = '1';
      const naturalHeight = targetBody.scrollHeight;
      targetBody.style.height  = '0';
      targetBody.style.opacity = '0';

      gsap.to(targetBody, { height: naturalHeight, opacity: 1, duration: 0.45, ease: 'power3.out' });
      gsap.to(targetArrow, { rotation: 180, duration: 0.4, ease: 'power2.inOut' });
      setOpenIndex(index);
    } else {
      gsap.to(targetBody, {
        height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut',
        onComplete: () => { targetBody.style.display = 'none'; },
      });
      gsap.to(targetArrow, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
      setOpenIndex(null);
    }
  };

  return (
    <InsightsSection ref={sectionRef}>
      <InsightsContainer>

        <InsightsHeader ref={headerRef}>
          <InsightsHeaderLeft>
            <InsightsLabel>{insightsHeader.label}</InsightsLabel>
            <InsightsSectionTitle>{insightsHeader.title}</InsightsSectionTitle>
          </InsightsHeaderLeft>
          {insightsHeader.subtitle && (
            <InsightsSubtitle>{insightsHeader.subtitle}</InsightsSubtitle>
          )}
        </InsightsHeader>

        <InsightsList ref={listRef}>
          {insightsData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <InsightItem key={i} data-insight $isOpen={isOpen}>

                {/* ── Always-visible card header ── */}
                <InsightCardHeader>

                  {/* Top row: tag + arrow */}
                  <InsightTopRow>
                    <InsightTag>{item.tag}</InsightTag>
                    <InsightArrow
                      ref={el => (arrowRefs.current[i] = el)}
                      aria-hidden="true"
                    >
                      <DownIcon/>
                    </InsightArrow>
                  </InsightTopRow>

                  {/* Title */}
                  <InsightTitle $isOpen={isOpen}>{item.title}</InsightTitle>

                  {/* Meta: author · date · read */}
                  <InsightMetaRow>
                    <InsightAuthor>{item.name}</InsightAuthor>
                    <InsightMetaDivider>·</InsightMetaDivider>
                    <InsightMetaItem>{item.date}</InsightMetaItem>
                    <InsightMetaDivider>·</InsightMetaDivider>
                    <InsightMetaItem>{item.read}</InsightMetaItem>
                  </InsightMetaRow>

                  {/* Intro — always visible */}
                  <InsightIntro>{item.subtitle}</InsightIntro>

                  {/* Clickable expand trigger sits over the whole card header */}
                  <InsightToggleOverlay
                    onClick={() => handleToggle(i)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Collapse ${item.title}` : `Expand ${item.title}`}
                  />
                </InsightCardHeader>

                {/* ── Expanded body ── */}
                <InsightBody
                  ref={el => (bodyRefs.current[i] = el)}
                  style={{ display: 'none', height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <InsightBodyInner>

                    {/* Body paragraphs */}
                    {item.body.map((para, j) => (
                      <InsightParagraph key={j}>{para}</InsightParagraph>
                    ))}

                    {/* Quote */}
                    {item.quote && (
                      <InsightQuote>
                        <InsightQuoteText>{item.quote}</InsightQuoteText>
                      </InsightQuote>
                    )}

                 

                  </InsightBodyInner>
                  
                </InsightBody>
                  {/* Pills */}
                  {item.pills?.length > 0 && (
                    <InsightPills>
                      {item.pills.map((pill, j) => (
                        <InsightPill key={j}>{pill}</InsightPill>
                      ))}
                    </InsightPills>
                  )}
              </InsightItem>
            );
          })}
        </InsightsList>

      </InsightsContainer>
    </InsightsSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const InsightsSection = styled.section`
  padding: 5rem 0;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 768px) { padding: 3rem 0; }
`;

const InsightsContainer = styled.div`
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  padding: 0 136px;
  @media (max-width: 968px) { padding: 0 2rem 0 6rem; }
  @media (max-width: 426px) { padding: 0 2rem; }
`;

const InsightsHeader = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
`;

const InsightsHeaderLeft = styled.div``;

const InsightsLabel = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
`;

const InsightsSectionTitle = styled.h2`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
  letter-spacing: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const InsightsSubtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 460px;
  @media (max-width: 968px) { font-size: 18px; max-width: 100%; }
`;

// ── List & card ───────────────────────────────────────────────────────────

const InsightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InsightItem = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3rem 6rem;
  transition: box-shadow 0.3s ease;
  box-shadow: ${({ $isOpen }) => $isOpen
    ? '0 6px 24px rgba(40,40,40,0.09)'
    : '0 2px 8px rgba(40,40,40,0.05)'};

  &:hover {
    box-shadow: 0 6px 24px rgba(40, 40, 40, 0.09);
  }
`;

// ── Card header (always visible) ──────────────────────────────────────────

const InsightCardHeader = styled.div`
  padding: 1.75rem 1.75rem 1.5rem;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) { padding: 1.25rem 1.25rem 1.25rem; }
`;

/* Invisible overlay so the entire header area is clickable
   but doesn't interfere with text selection */
const InsightToggleOverlay = styled.button`
  position: absolute;
  inset: 0;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 12px 12px 0 0;
  z-index: 1;

  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: -2px;
  }
`;

const InsightTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  position: relative;
  z-index: 2; /* above overlay so arrow is visible */
  pointer-events: none;
`;

const InsightTag = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const InsightArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;          
  flex-shrink: 0;
  font-size: 32px;       
  color: #FF3863;
  transform-origin: center center;
  pointer-events: none;

  svg {
    width: 44px;
    height: 44px;
    display: block;
    transform-origin: center center;  
  }
`;

const InsightTitle = styled.h3`
    font-size: 25px;
  font-weight: 600;
  color: #282828;
  margin: 0 0 4px 0;
  line-height: 1;
  transition: color 0.2s ease;

  ${InsightCardHeader}:hover & { color: #FF3863; }
`;

const InsightMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0.75rem 0;
  pointer-events: none;
  position: relative;
  z-index: 2;
`;

const InsightAuthor = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #282828;
`;

const InsightMetaDivider = styled.span`
  font-size: 15px;
  color: #999;
`;

const InsightMetaItem = styled.span`
  font-size: 15px;
  color: #999;
`;

const InsightPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 1rem;
  margin-left: 1.4rem;
  pointer-events: none;
  position: relative;
  z-index: 2;
`;

const InsightPill = styled.span`
  font-size: 14px;
  padding: 3px 11px;
  border-radius: 20px;
  border: 1px solid #333;
  color: #333;
  letter-spacing: 0.03em;
  margin-top: 1rem;
  background: rgba(40, 40, 40, 0.02);
`;

const InsightIntro = styled.p`
  font-size: 18px;
  line-height: 1.75;
  color: #555;
  margin: 0;
  pointer-events: none;
  padding-top: .5rem;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { font-size: 15px; }
`;

// ── Expanded body ─────────────────────────────────────────────────────────

const InsightBody = styled.div`
  overflow: hidden;
`;

const InsightBodyInner = styled.div`
  padding: 0 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  border-top: 1px solid #f0f0f0;
  padding-top: .5rem;

  @media (max-width: 768px) { padding: 1.25rem 1.25rem 1.75rem; }
`;

const InsightQuote = styled.blockquote`
  margin: 0;
  max-width:720px;
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid #FF3863;
  background: rgba(255, 56, 99, 0.03);
  border-radius: 0 8px 8px 0;
`;

const InsightQuoteText = styled.p`
  font-size: 17px;
  font-style: italic;
  line-height: 1.75;
  color: #555;
  margin: 0;
  @media (max-width: 768px) { font-size: 15px; }
`;

const InsightParagraph = styled.p`
  font-size: 18px;
  line-height: 1.85;
  color: #555;
  margin: 0;
  @media (max-width: 768px) { font-size: 16px; }
`;