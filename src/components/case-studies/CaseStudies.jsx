// src/components/case-studies/CaseStudies.js
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CarouselControls from './CarouselControls';
import { caseStudies } from './caseStudies';

/* ─── Lazy Video Card ─────────────────────────────────────────────────────── */

const LazyVideoCard = ({ study, index, hasAnimated }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [videoSrcSet, setVideoSrcSet] = useState(false); // has the src been assigned?
  const [videoReady, setVideoReady] = useState(false);   // has video fired canplay?

  useEffect(() => {
    if (!study.video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoSrcSet) {
          setVideoSrcSet(true); // triggers src assignment → browser starts fetching
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [study.video, videoSrcSet]);

  // Once the video can play, show it and play once (no loop)
  const handleCanPlay = useCallback(() => {
    if (videoReady) return; // guard against duplicate fires
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.1;
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser — still reveal the video frame
      });
    }
  }, [videoReady]);

  const handleEnded = useCallback(() => {
    setVideoReady(false); // fade image back in, hide video
  }, []);

  return (
    <Card ref={cardRef} $index={index} $hasAnimated={hasAnimated}>
      <MediaContainer>
        {/* Poster image — fades out once video is ready */}
        <Image
          src={study.image}
          alt={study.title}
          $hidden={videoReady}
        />

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

      <CardTop />

      <CardContent>
        <ClientName>{study.client}</ClientName>
        <ProjectTitle>{study.title}</ProjectTitle>
        <ProjectDescription>{study.shortDescription}</ProjectDescription>
        <Tags>{study.tags?.slice(0, 3).join(' • ')}</Tags>
      </CardContent>

      <OverlayCard>
        <OverlayContent>
          <OverlayTitle>{study.client}</OverlayTitle>
          <OverlaySubtitle>{study.title}</OverlaySubtitle>
          <OverlayDescription>{study.description}</OverlayDescription>
        </OverlayContent>
        <OverlayTagsButton>
          <OverlayTags>{study.tags?.join(' • ')}</OverlayTags>
          <ViewButton>Full Case Study →</ViewButton>
        </OverlayTagsButton>
      </OverlayCard>
    </Card>
  );
};

/* ─── CaseStudies ─────────────────────────────────────────────────────────── */

const CaseStudies = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const CARD_WIDTH = 480;
  const GAP = 64;

  const updateCurrentIndex = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft } = containerRef.current;
    const newIndex = Math.round(scrollLeft / (CARD_WIDTH + GAP));
    setCurrentIndex(Math.min(Math.max(newIndex, 0), caseStudies.length - 1));
  }, [CARD_WIDTH, GAP]);

  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({ left: (CARD_WIDTH + GAP) * index, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const scrollToPrev = () => { if (currentIndex > 0) scrollToCard(currentIndex - 1); };
  const scrollToNext = () => { if (currentIndex < caseStudies.length - 1) scrollToCard(currentIndex + 1); };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasAnimated) setHasAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [hasAnimated]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateCurrentIndex);
    return () => container.removeEventListener('scroll', updateCurrentIndex);
  }, [updateCurrentIndex]);

  return (
    <Section ref={sectionRef} id="works">
      <Container>
        <Header>
          <TitleWrapper>
            <Label $hasAnimated={hasAnimated}>Selected Works &</Label>
            <Title $hasAnimated={hasAnimated}>Case Studies</Title>
          </TitleWrapper>
        </Header>

        <CarouselWrapper>
          <ControlsWrapper $hasAnimated={hasAnimated}>
            <CarouselControls
              onPrev={scrollToPrev}
              onNext={scrollToNext}
              canScrollLeft={currentIndex > 0}
              canScrollRight={currentIndex < caseStudies.length - 3}
            />
          </ControlsWrapper>

          <CardsContainer ref={containerRef}>
            <CardsTrack $hasAnimated={hasAnimated}>
              {caseStudies.map((study, index) => (
                <LazyVideoCard
                  key={study.id}
                  study={study}
                  index={index}
                  hasAnimated={hasAnimated}
                />
              ))}
              <Placeholder />
            </CardsTrack>
          </CardsContainer>
        </CarouselWrapper>
      </Container>
    </Section>
  );
};

/* ─── Styled Components ───────────────────────────────────────────────────── */

const Section = styled.section`
  padding: 0 0 48px 0;
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin-bottom: 4rem;
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 24px;
  padding-left: 135px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleWrapper = styled.div``;

const Label = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 600;
  transform: translateX(${p => p.$hasAnimated ? '0' : '-50px'});
  opacity: ${p => p.$hasAnimated ? 1 : 0};
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s,
              opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
`;

const Title = styled.h2`
  font-size: clamp(48px, 8vw, 61px);
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 16px;
  transform: translateX(${p => p.$hasAnimated ? '0' : '-50px'});
  opacity: ${p => p.$hasAnimated ? 1 : 0};
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s,
              opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
`;

const CarouselWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 10;
  transform: translateY(${p => p.$hasAnimated ? '0' : '-30px'});
  opacity: ${p => p.$hasAnimated ? 1 : 0};
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s,
              opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
`;

const CardsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0 40px 130px;
  flex: 1;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
`;

const CardsTrack = styled.div`
  display: flex;
  gap: 64px;
  padding-left: calc(10vw - 90px);
  padding-right: calc(50vw - 240px);
  transform: translateX(${p => p.$hasAnimated ? '0' : '60vw'});
  transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
`;

const Card = styled.div`
  flex: 0 0 480px;
  height: 560px;
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(40, 40, 40, 0.12);
  scroll-snap-align: center;
  border: 1px solid rgba(40, 40, 40, 0.08);
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
`;

const MediaContainer = styled.div`
  width: 100%;
  height: 360px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Fade out once video is ready */
  opacity: ${p => p.$hidden ? 0 : 1};
  transition: all 0.6s ease;
  z-index: 2;
  pointer-events: none;
  ${Card}:hover & { transform: scale(1.1); }
`;

const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  background: #000;
  /* Only reveal once canplay has fired */
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease, transform 0.3s ease;
  z-index: 1;
  ${Card}:hover & { transform: scale(1.1); }
`;

const CardTop = styled.div`
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  background: #FCFDFF;
  margin-top: -40px;
  position: relative;
  z-index: 2;
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
  filter:
    drop-shadow(0px -4px 12px rgba(40, 40, 40, 0.18))
    drop-shadow(0px -1px 4px rgba(40, 40, 40, 0.10));
`;

const CardContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #FCFDFF;
  margin-top: -2px;
`;

const ClientName = styled.h3`
  font-size: 25px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  line-height: 1;
`;

const ProjectTitle = styled.h4`
  font-size: 20px;
  font-weight: 500;
  color: #282828;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const ProjectDescription = styled.h4`
  font-size: 16px;
  font-weight: 400;
  color: #282828;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const Tags = styled.div`
  font-size: 16px;
  color: #FF3863;
  font-family: monospace;
  margin-top: auto;
`;

const OverlayCard = styled.div`
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
  ${Card}:hover & { clip-path: circle(150% at 50% 0%); }
`;

const OverlayContent = styled.div`
  padding: 32px 24px;
  text-align: left;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1.2s ease 0.3s;
  width: 100%;
  ${Card}:hover & { opacity: 1; transform: scale(1); }
`;

const OverlayTagsButton = styled.div`
  text-align: center;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1.2s ease 0.3s;
  width: 100%;
  ${Card}:hover & { opacity: 1; transform: scale(1); }
`;

const OverlayTitle = styled.h3`
  font-size: 31px;
  font-weight: 700;
  color: #FFFEFA;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const OverlaySubtitle = styled.h4`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, .9);
  margin: 0 0 16px 0;
  line-height: 1.3;
`;

const OverlayDescription = styled.p`
  font-size: 16px;
  min-height: 270px;
  color: rgba(255, 255, 255, .9);
  margin: 0 0 20px 0;
  line-height: 1.6;
`;

const OverlayTags = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  font-family: monospace;
  margin-bottom: 24px;
`;

const ViewButton = styled.button`
  background: transparent;
  border: 2px solid #FF3863;
  color: #FF3863;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { background: #FF3863; color: #FFFEFA; transform: scale(1.05); }
`;

const Placeholder = styled.div`
  width: 1px;
  height: 1px;
  opacity: 0;
  flex-shrink: 0;
`;

export default CaseStudies;