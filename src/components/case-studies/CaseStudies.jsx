// src/components/case-studies/CaseStudies.jsx
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CarouselControls from './CarouselControls';
import { caseStudies } from './CaseStudies';

gsap.registerPlugin(ScrambleTextPlugin);

/* ─── Lazy Video Card ─────────────────────────────────────────────────────── */

const LazyVideoCard = ({ study, index, hasAnimated, containerRef, isTablet, isClicked, onToggleClick }) => {
  const cardRef   = useRef(null);
  const videoRef  = useRef(null);
  const srcSetRef = useRef(false);
  const [videoSrcSet, setVideoSrcSet] = useState(false);
  const [videoReady, setVideoReady]   = useState(false);

  useEffect(() => {
    if (!study.video) return;
    const root = containerRef?.current ?? null;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!srcSetRef.current) {
            srcSetRef.current = true;
            setTimeout(() => setVideoSrcSet(true), 0);
          }
          if (videoRef.current && videoRef.current.readyState >= 3) {
            videoRef.current.currentTime = 0;
            videoRef.current.playbackRate = 1.1;
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) videoRef.current.pause();
          setTimeout(() => setVideoReady(false), 0);
        }
      },
      { root, threshold: 0.4 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [study.video, containerRef]);

  const handleCanPlay = useCallback(() => {
    if (videoReady) return;
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.1;
      videoRef.current.play().catch(() => {});
    }
  }, [videoReady]);

  const handleEnded = useCallback(() => {
    setVideoReady(false);
  }, []);

  const handleCardClick = useCallback((e) => {
    if (isTablet) {
      e.stopPropagation();
      onToggleClick();
    }
  }, [isTablet, onToggleClick]);

  return (
    <Card
      ref={cardRef}
      $index={index}
      $hasAnimated={hasAnimated}
      data-clicked={isClicked ? 'true' : undefined}
      onClick={handleCardClick}
      style={{ cursor: isTablet ? 'pointer' : 'default' }}
    >
      <MediaContainer>
        <Image src={study.image} alt={study.title} $hidden={videoReady} />
        {study.video && (
          <Video
            ref={videoRef}
            src={videoSrcSet ? study.video : undefined}
            muted
            playsInline
            onCanPlay={handleCanPlay}
            onEnded={handleEnded}
            $visible={videoReady}
          />
        )}
      </MediaContainer>

      <CardTopWrapper>
        <CardTopInner />
      </CardTopWrapper>

      <CardContent>
        <ClientName>{study.client}</ClientName>
        <ProjectTitle>{study.title}</ProjectTitle>
        <ProjectDescription>{study.shortDescription}</ProjectDescription>
        <Tags>{study.tags?.slice(0, 3).join(' • ')}</Tags>
      </CardContent>

      <OverlayCard>
        <OverlayContent>
          <OverlayTitle>{study.client}</OverlayTitle>
          <OverlayDescription>{study.description}</OverlayDescription>
        </OverlayContent>
        <OverlayTagsButton>
          <OverlayTags>{study.tags?.join(' • ')}</OverlayTags>
        </OverlayTagsButton>
      </OverlayCard>
    </Card>
  );
};

/* ─── CaseStudies ─────────────────────────────────────────────────────────── */

const CaseStudies = () => {
  const containerRef   = useRef(null);
  const sectionRef     = useRef(null);
  const labelRef       = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [currentIndex, setCurrentIndex]   = useState(0);
  const [clickedIndex, setClickedIndex]   = useState(null);
  const [hasAnimated, setHasAnimated]     = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [isTablet, setIsTablet]           = useState(false);

  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth <= 968);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Desktop scroll constants ──────────────────────────────────────────────
  const CARD_WIDTH = 480;
  const GAP        = 64;

  // ── Desktop: sync currentIndex with scroll position ───────────────────────
  const updateCurrentIndex = useCallback(() => {
    if (!containerRef.current || isTablet) return;
    const { scrollLeft } = containerRef.current;
    const newIndex = Math.round(scrollLeft / (CARD_WIDTH + GAP));
    setCurrentIndex(Math.min(Math.max(newIndex, 0), caseStudies.length - 1));
  }, [CARD_WIDTH, GAP, isTablet]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateCurrentIndex);
    return () => container.removeEventListener('scroll', updateCurrentIndex);
  }, [updateCurrentIndex]);

  // ── Navigate to a card ────────────────────────────────────────────────────
  const scrollToCard = useCallback((index) => {
    const clamped = Math.min(Math.max(index, 0), caseStudies.length - 1);
    setCurrentIndex(clamped);
    setClickedIndex(null); // close any open overlay on navigation
    if (!isTablet && containerRef.current) {
      containerRef.current.scrollTo({
        left: (CARD_WIDTH + GAP) * clamped,
        behavior: 'smooth',
      });
    }
  }, [isTablet, CARD_WIDTH, GAP]);

  const scrollToPrev = useCallback(() => {
    if (currentIndex > 0) scrollToCard(currentIndex - 1);
  }, [currentIndex, scrollToCard]);

  const scrollToNext = useCallback(() => {
    if (currentIndex < caseStudies.length - 1) scrollToCard(currentIndex + 1);
  }, [currentIndex, scrollToCard]);

  // ── Toggle overlay (tap on mobile/tablet) ─────────────────────────────────
  const handleToggleClick = useCallback((index) => {
    setClickedIndex(prev => prev === index ? null : index);
  }, []);

  // ── Section enter animation (fires once) ─────────────────────────────────
  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setHasAnimated(true);

          if (labelRef.current) labelRef.current.textContent = '';
          gsap.to(labelRef.current, {
            duration: 1.6,
            delay: 0.2,
            scrambleText: {
              text: 'Selected Works &',
              chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
              revealDelay: 0.4,
              speed: 0.6,
            },
            ease: 'none',
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Lock desktop scroll snap after entry animation ────────────────────────
  useEffect(() => {
    if (!hasAnimated) return;
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.scrollSnapType = 'x mandatory';
        containerRef.current.scrollLeft = 0;
      }
      setAnimationDone(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, [hasAnimated]);

  // ── Desktop drag-to-scroll ────────────────────────────────────────────────
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const handlePointerDown = useCallback((e) => {
    if (isTablet) return;
    const container = containerRef.current;
    if (!container) return;
    dragRef.current = { isDragging: true, startX: e.clientX, scrollLeft: container.scrollLeft };
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  }, [isTablet]);

  const handlePointerMove = useCallback((e) => {
    if (isTablet || !dragRef.current.isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const dx = e.clientX - dragRef.current.startX;
    container.scrollLeft = dragRef.current.scrollLeft - dx;
  }, [isTablet]);

  const handlePointerUp = useCallback(() => {
    if (isTablet) return;
    const container = containerRef.current;
    if (!container) return;
    dragRef.current.isDragging = false;
    container.style.cursor = 'grab';
    container.style.userSelect = 'none';
  }, [isTablet]);

  return (
    <Section ref={sectionRef} id="works">
      <Container>
        <Header>
          <HeaderLeft>
            <Label ref={labelRef} aria-label="Selected Works &" $hasAnimated={hasAnimated} />
            <Title $hasAnimated={hasAnimated}>Case Studies</Title>
          </HeaderLeft>
          <Subtitle $hasAnimated={hasAnimated}>
            <strong>Hand-picked projects</strong> including web development, design, and Pendo consulting.
          </Subtitle>
        </Header>

        <CarouselWrapper>

          {/* Desktop controls — hidden on tablet/mobile */}
          <DesktopControlsWrapper $hasAnimated={hasAnimated}>
            <CarouselControls
              onPrev={scrollToPrev}
              onNext={scrollToNext}
              canScrollLeft={currentIndex > 0}
              canScrollRight={currentIndex < caseStudies.length - 3}
            />
          </DesktopControlsWrapper>

          {/* Desktop scroll carousel — hidden on tablet/mobile */}
          <CardsContainer
            ref={containerRef}
            $animationDone={animationDone}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <CardsTrack $hasAnimated={hasAnimated}>
              {hasAnimated && caseStudies.map((study, index) => (
                <LazyVideoCard
                  key={study.id}
                  study={study}
                  index={index}
                  hasAnimated={hasAnimated}
                  containerRef={containerRef}
                  isTablet={isTablet}
                  isClicked={clickedIndex === index}
                  onToggleClick={() => handleToggleClick(index)}
                />
              ))}
              <Placeholder />
            </CardsTrack>
          </CardsContainer>

          {/* Mobile/tablet CSS-transform carousel — hidden on desktop */}
          {hasAnimated && (
            <MobileCarousel>
              <MobileControlsWrapper>
                <CarouselControls
                  onPrev={scrollToPrev}
                  onNext={scrollToNext}
                  canScrollLeft={currentIndex > 0}
                  canScrollRight={currentIndex < caseStudies.length - 1}
                />
              </MobileControlsWrapper>
              <MobileTrackViewport>
                <MobileTrack $currentIndex={currentIndex}>
                  {caseStudies.map((study, index) => (
                    <LazyVideoCard
                      key={study.id}
                      study={study}
                      index={index}
                      hasAnimated={hasAnimated}
                      containerRef={null}
                      isTablet={isTablet}
                      isClicked={clickedIndex === index}
                      onToggleClick={() => handleToggleClick(index)}
                    />
                  ))}
                </MobileTrack>
              </MobileTrackViewport>
            </MobileCarousel>
          )}

        </CarouselWrapper>
      </Container>
    </Section>
  );
};

export default CaseStudies;

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled.section.attrs({ className: 'caseStudies-Section' })`
  min-height: 90vh;
  height: auto;
  overflow: hidden;
  position: relative;

  @media (max-width: 968px) {
    min-height: auto;
    overflow: visible !important;
    overflow-x: hidden;
  }
`;

const Container = styled.div.attrs({ className: 'caseStudies-Container' })`
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 1415px) {
    height: auto;
    padding: 40px 0;
  }

  @media (max-width: 968px) {
    padding: 32px 0 48px;
  }
`;

const Header = styled.div.attrs({ className: 'caseStudies-Header' })`
  margin-bottom: 24px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 136px;
  padding-right: 120px;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 2rem 0 6rem;
  }

  @media (max-width: 426px) {
    padding: 0 2rem;
  }
`;

const HeaderLeft = styled.div.attrs({ className: 'caseStudies-HeaderLeft' })``;

const Label = styled.span.attrs({ className: 'caseStudies-Label' })`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
  min-height: 1.2em;
`;

const Title = styled.h2.attrs({ className: 'caseStudies-Title' })`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateX(-50px);
  animation: caseStudiesTitleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;

  @keyframes caseStudiesTitleIn {
    to { opacity: 1; transform: translateX(0); }
  }
`;

const Subtitle = styled.p.attrs({ className: 'caseStudies-Subtitle' })`
  font-size: 20px;
  color: #282828;
  max-width: 460px;
  margin-top: 2rem;
  opacity: 0;
  transform: translateX(50px);
  animation: caseStudiesSubtitleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;

  @media (max-width: 968px) {
    font-size: 18px;
    max-width: 400px;
    margin-top: 0;
  }

  @keyframes caseStudiesSubtitleIn {
    to { opacity: 1; transform: translateX(0); }
  }
`;

const CarouselWrapper = styled.div.attrs({ className: 'caseStudies-CarouselWrapper' })`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

/* ── Desktop controls — hidden on tablet/mobile ── */
const DesktopControlsWrapper = styled.div.attrs({ className: 'caseStudies-DesktopControlsWrapper' })`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-30px);
  animation: caseStudiesControlsIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;

  @media (max-width: 968px) {
    display: none;
  }

  @keyframes caseStudiesControlsIn {
    to { opacity: 1; transform: translateY(0); }
  }
`;

/* ── Desktop scroll carousel — hidden on tablet/mobile ── */
const CardsContainer = styled.div.attrs({ className: 'caseStudies-CardsContainer' })`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0 40px 130px;
  flex: 1;
  cursor: grab;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: ${p => p.$animationDone ? 'x mandatory' : 'none'};

  @media (max-width: 968px) {
    display: none;
  }
`;

const CardsTrack = styled.div.attrs({ className: 'caseStudies-CardsTrack' })`
  display: flex;
  gap: 64px;
  padding-left: calc(10vw - 90px);
  padding-right: calc(50vw - 240px);
  transform: translateX(${p => p.$hasAnimated ? '0' : '60vw'});
  transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
`;

/* ── Mobile/tablet carousel — hidden on desktop ── */
const MobileCarousel = styled.div.attrs({ className: 'caseStudies-MobileCarousel' })`
  display: none;

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    padding: 16px 0 32px;
  }
`;

const MobileControlsWrapper = styled.div.attrs({ className: 'caseStudies-MobileControlsWrapper' })`
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const MobileTrackViewport = styled.div.attrs({ className: 'caseStudies-MobileTrackViewport' })`
  width: 100%;
  overflow: hidden;
`;

const MobileTrack = styled.div.attrs({ className: 'caseStudies-MobileTrack' })`
  display: flex;
  gap: 24px;
  /* card = 80vw, centre offset = 50vw - 40vw = 10vw */
  transform: translateX(calc(10vw - ${p => p.$currentIndex} * (80vw + 24px)));
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;

  @media (max-width: 426px) {
    /* card = 88vw, centre offset = 50vw - 44vw = 6vw */
    transform: translateX(calc(6vw - ${p => p.$currentIndex} * (88vw + 24px)));
  }
`;

/* ── Shared card ── */
const Card = styled.div.attrs({ className: 'caseStudies-Card' })`
  flex: 0 0 480px;
  height: 500px;
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(40, 40, 40, 0.12);
  scroll-snap-align: center;
  border: 2px solid rgba(40, 40, 40, 0.18);
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: scale(1.05) translateY(-10px);
    box-shadow: 0 20px 30px rgba(40, 40, 40, 0.15);
  }

  opacity: ${p => p.$hasAnimated ? 1 : 0};
  transform: ${p => p.$hasAnimated ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)'};
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${p => p.$hasAnimated ? `${0.5 + p.$index * 0.1}s` : '0s'},
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${p => p.$hasAnimated ? `${0.5 + p.$index * 0.1}s` : '0s'};

  @media (max-width: 968px) {
    flex: 0 0 80vw;
    height: auto;
    min-height: 520px;
    &:hover { transform: none; }
  }

  @media (max-width: 426px) {
    flex: 0 0 88vw;
    min-height: 500px;
  }
`;

const MediaContainer = styled.div.attrs({ className: 'caseStudies-MediaContainer' })`
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
  position: relative;

  @media (max-width: 968px) {
    height: 340px;
  }
  @media (max-width: 426px) {
    height: 380px;
  }
`;

const Image = styled.img.attrs({ className: 'caseStudies-Image' })`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${p => p.$hidden ? 0 : 1};
  transition: all 0.6s ease;
  z-index: 2;
  pointer-events: none;
  ${Card}:hover & { transform: scale(1.1); }
`;

const Video = styled.video.attrs({ className: 'caseStudies-Video' })`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease, transform 0.3s ease;
  z-index: 1;
  ${Card}:hover & { transform: scale(1.1); }
`;

const CardTopWrapper = styled.div.attrs({ className: 'caseStudies-CardTopWrapper' })`
  width: 100%;
  height: 44px;
  flex-shrink: 0;
  margin-top: -40px;
  position: relative;
  z-index: 2;
  filter:
    drop-shadow(0px -1px 0px rgba(40, 40, 40, 0.08))
    drop-shadow(0px -1px 0px rgba(40, 40, 40, 0.08));
`;

const CardTopInner = styled.div.attrs({ className: 'caseStudies-CardTopInner' })`
  width: 100%;
  height: 100%;
  background: #FCFDFF;
  clip-path: polygon(
    0% 65%, 1% 64.95%, 2% 64.8%, 3% 64.6%, 4% 64.3%, 5% 63.9%,
    6% 63.45%, 7% 62.9%, 8% 62.25%, 9% 61.55%, 10% 60.8%, 11% 59.95%,
    12% 59.05%, 13% 58.1%, 14% 57.1%, 15% 56.05%, 16% 55%, 17% 53.9%,
    18% 52.8%, 19% 51.65%, 20% 50.5%, 21% 49.35%, 22% 48.2%, 23% 47.05%,
    24% 45.9%, 25% 44.8%, 26% 43.75%, 27% 42.75%, 28% 41.75%, 29% 40.8%,
    30% 39.9%, 31% 39.1%, 32% 38.35%, 33% 37.65%, 34% 37.05%, 35% 36.5%,
    36% 36.05%, 37% 35.65%, 38% 35.35%, 39% 35.15%, 40% 35.05%, 41% 35%,
    42% 35.05%, 43% 35.2%, 44% 35.45%, 45% 35.75%, 46% 36.15%, 47% 36.65%,
    48% 37.2%, 49% 37.85%, 50% 38.55%, 51% 39.35%, 52% 40.2%, 53% 41.1%,
    54% 42.05%, 55% 43.05%, 56% 44.1%, 57% 45.15%, 58% 46.3%, 59% 47.4%,
    60% 48.55%, 61% 49.7%, 62% 50.85%, 63% 52%, 64% 53.15%, 65% 54.25%,
    66% 55.35%, 67% 56.4%, 68% 57.45%, 69% 58.4%, 70% 59.35%, 71% 60.2%,
    72% 61.05%, 73% 61.8%, 74% 62.45%, 75% 63.05%, 76% 63.6%, 77% 64.05%,
    78% 64.4%, 79% 64.7%, 80% 64.85%, 81% 65%, 82% 65%, 83% 64.9%,
    84% 64.75%, 85% 64.5%, 86% 64.2%, 87% 63.75%, 88% 63.25%, 89% 62.7%,
    90% 62.05%, 91% 61.3%, 92% 60.5%, 93% 59.65%, 94% 58.75%, 95% 57.8%,
    96% 56.8%, 97% 55.75%, 98% 54.65%, 99% 53.55%, 100% 52.4%,
    100% 100%, 0% 100%
  );
`;

const CardContent = styled.div.attrs({ className: 'caseStudies-CardContent' })`
  padding: 8px 24px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #FCFDFF;
  margin-top: -2px;
`;

const ClientName = styled.h3.attrs({ className: 'caseStudies-ClientName' })`
  font-size: 25px;
  font-weight: 600;
  color: #282828;
  margin: 0 0 4px 0;
  line-height: 1;
`;

const ProjectTitle = styled.h4.attrs({ className: 'caseStudies-ProjectTitle' })`
  font-size: 20px;
  font-weight: 500;
  color: #282828;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const ProjectDescription = styled.h4.attrs({ className: 'caseStudies-ProjectDescription' })`
  font-size: 16px;
  font-weight: 400;
  color: #282828;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const Tags = styled.div.attrs({ className: 'caseStudies-Tags' })`
  font-size: 16px;
  color: #282828;
  font-weight: 700;
  font-family: monospace;
  margin-top: auto;
  text-align: center;
`;

const OverlayCard = styled.div.attrs({ className: 'caseStudies-OverlayCard' })`
  position: absolute;
  inset: 0;
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(4px);
  color: #FFFEFA;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: 12px;
  z-index: 5;
  clip-path: circle(0% at 50% 150%);
  ${Card}:hover &,
  ${Card}[data-clicked="true"] & { clip-path: circle(150% at 50% 0%); }
`;

const OverlayContent = styled.div.attrs({ className: 'caseStudies-OverlayContent' })`
  padding: 24px;
  min-height: 90%;
  text-align: left;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1.2s ease 0.3s;
  width: 100%;
  ${Card}:hover &,
  ${Card}[data-clicked="true"] & { opacity: 1; transform: scale(1); }
`;

const OverlayTagsButton = styled.div.attrs({ className: 'caseStudies-OverlayTagsButton' })`
  text-align: center;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1.2s ease 0.3s;
  width: 100%;
  ${Card}:hover &,
  ${Card}[data-clicked="true"] & { opacity: 1; transform: scale(1); }
`;

const OverlayTitle = styled.h3.attrs({ className: 'caseStudies-OverlayTitle' })`
  font-size: 25px;
  font-weight: 600;
  color: #FFFEFA;
  margin: 0 0 24px 0;
  line-height: 1;
`;

const OverlayDescription = styled.p.attrs({ className: 'caseStudies-OverlayDescription' })`
  font-size: 16px;
  min-height: 210px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px;
  line-height: 1.6;
  white-space: pre-line;
  @media (max-width: 426px) {
  font-size: 15px;
  letter-spacing: -.2px;
  }
`;

// const OverlayTags = styled.div.attrs({ className: 'caseStudies-OverlayTags' })`
//   text-align: center;
//   font-size: 16px;
//   font-weight: 500;
//   font-family: monospace;
//   margin-bottom: 24px;
//    @media (max-width: 426px) {
//   font-size: 15px;
//   letter-spacing: -.2px;
//   }
// `;
const OverlayTags = styled.div.attrs({ className: 'caseStudies-OverlayTags' })`
font-size: 16px;
  color: #fff;
  font-weight: 700;
  font-family: monospace;
  margin-top: auto;
  text-align: center;
   @media (max-width: 426px) {
  font-size: 15px;
  letter-spacing: -.2px;
  }
`;

const Placeholder = styled.div.attrs({ className: 'caseStudies-Placeholder' })`
  width: 1px;
  height: 1px;
  opacity: 0;
  flex-shrink: 0;
`;