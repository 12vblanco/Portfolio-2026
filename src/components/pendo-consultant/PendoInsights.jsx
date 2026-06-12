import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DownIcon } from '../../assets/icons/Down';
import { prefersReducedMotion } from '../../utils/motion';
import { insightsHeader, publishedInsights } from './pendoInsightsData';

gsap.registerPlugin(ScrollTrigger);

export const PendoInsights = () => {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const listRef    = useRef(null);

  // ── Scroll-in animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) return;

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

  return (
    <InsightsSection ref={sectionRef} id='insights'>
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
          {publishedInsights.map((item) => (
            <InsightItem key={item.slug} data-insight>

              <InsightCardHeader>

                <InsightTopRow>
                  <InsightTag>{item.tag}</InsightTag>
                  <InsightArrow aria-hidden="true">
                    <DownIcon />
                  </InsightArrow>
                </InsightTopRow>

                <InsightTitle>{item.title}</InsightTitle>

                <InsightMetaRow>
                  <InsightAuthor>{item.name}</InsightAuthor>
                  <InsightMetaDivider>·</InsightMetaDivider>
                  <InsightMetaItem>{item.date}</InsightMetaItem>
                  <InsightMetaDivider>·</InsightMetaDivider>
                  <InsightMetaItem>{item.read}</InsightMetaItem>
                </InsightMetaRow>

                <InsightIntro>{item.subtitle}</InsightIntro>

                <InsightReadMore>Read the full article</InsightReadMore>

                <InsightLinkOverlay
                  to={`/insights/${item.slug}`}
                  aria-label={`Read ${item.title}`}
                />
              </InsightCardHeader>

              {/* ── Pills ── */}
              {item.pills?.length > 0 && (
                <InsightPills>
                  {item.pills.map((pill, j) => (
                    <InsightPill key={j}>{pill}</InsightPill>
                  ))}
                </InsightPills>
              )}

            </InsightItem>
          ))}
        </InsightsList>

      </InsightsContainer>
    </InsightsSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────
// Identical to the originals, no tokens changed.

const InsightsSection = styled.section`
  padding: 5rem 0;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 768px) {
    padding: 2rem 0;

    }
`;

const InsightsContainer = styled.div`
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  padding: 0 136px;
  @media (max-width: 968px) { padding: 0 2rem 0 6rem; }
  @media (max-width: 426px) { padding: 0 .6rem; }
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

const InsightsHeaderLeft = styled.div`
@media (max-width: 468px) {
    padding-left: 2rem;
   }
`;

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
  @media (max-width: 468px) {
   }
`;

const InsightsSubtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 460px;
  @media (max-width: 968px) { font-size: 18px; max-width: 100%; };
  @media (max-width: 468px) {
    padding-left: 2rem;
   }
`;

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
  box-shadow: 0 2px 8px rgba(40,40,40,0.05);

  &:hover { box-shadow: 0 6px 24px rgba(40, 40, 40, 0.09); }

  @media (max-width: 768px) { padding: .3rem; }
`;

const InsightCardHeader = styled.div`
  padding: 1.75rem 1.75rem 1.5rem;
  position: relative;
  @media (max-width: 768px) { padding: 1.2; }
`;

const InsightLinkOverlay = styled(Link)`
  position: absolute;
  inset: 0;
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
  z-index: 2;
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
  transform: rotate(-90deg);
  transform-origin: center center;
  pointer-events: none;
  transition: transform 0.3s ease;

  ${InsightCardHeader}:hover & { transform: rotate(-90deg) translateY(4px); }

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
  margin: 0 0 4px;
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

const InsightAuthor    = styled.span` font-size: 15px; font-weight: 600; color: #282828; `;
const InsightMetaDivider = styled.span` font-size: 15px; color: #999; `;
const InsightMetaItem  = styled.span` font-size: 15px; color: #999; `;

const InsightIntro = styled.p`
  font-size: 18px;
  line-height: 1.75;
  color: #555;
  margin: 0;
  pointer-events: none;
  padding-top: 0.5rem;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { font-size: 15px; }
`;

const InsightReadMore = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: #282828;
  border-bottom: 2px solid #FF3863;
  padding-bottom: 1px;
  margin-top: 1rem;
  pointer-events: none;
  position: relative;
  z-index: 2;
  transition: color 0.2s ease;
  ${InsightCardHeader}:hover & { color: #FF3863; }
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
