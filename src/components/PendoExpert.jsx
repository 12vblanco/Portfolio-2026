import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cert2 from '..//assets/pendoCert/cert2.png';
import cert3 from '..//assets/pendoCert/cert3.png';
import cert4 from '..//assets/pendoCert/cert4.png';
import cert5 from '..//assets/pendoCert/cert5.png';
import cert6 from '..//assets/pendoCert/cert6.png';
import cert7 from '..//assets/pendoCert/cert7.png';
import cert8 from '..//assets/pendoCert/cert8.png';
import cert1 from '../assets/pendoCert/cert1.png';
import pendoGraph from '../assets/pendoCert/pendo-graph-2.jpg';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// Each feature has an optional inlineLink: { text, before, after }
// which splits the feature text around a Link to /pendo-consultant
const features = [
  {
    number: '01',
    title: 'Installation & Setup',
    before: 'Pendo Admin certified and experienced in ',
    link: 'full Pendo installations',
    after: '. I set up your account the right way so everything downstream is reliable.',
  },
  {
    number: '02',
    title: 'Audit & Optimisation',
    before: '',
    link: 'Audits of existing installations',
    after: ' identifying gaps in tracking coverage, flag redundant or broken tags, and deliver a clear prioritised list of improvements.',
  },
  {
    number: '03',
    title: 'Guides, Onboarding & User Flows',
    before: 'From tooltips to multi-step onboarding flows and announcements, I build ',
    link: 'fully customised guides',
    after: ' that match your brand and move users toward key actions.',
  },
  {
    number: '04',
    title: 'Analytics & Reporting',
    before: 'Dashboards, funnels, and reports that surface what actually matters. ',
    link: 'Data you can act on',
    after: ' to build effective products.',
  },
];

const certImages = [cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8];

export const PendoExpert = () => {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const middleRef    = useRef(null);
  const badgesRef    = useRef(null);
  const badgeRefs    = useRef([]);
  const certifiedRef = useRef(null);

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, certImages.length);

    const ctx = gsap.context(() => {

      // ── Header & middle row fade in ──────────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo(headerRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 }
          );
          gsap.fromTo(middleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.15 }
          );

          gsap.to(certifiedRef.current, {
            duration: 1.2,
            scrambleText: {
              text: 'Certified',
              chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
              revealDelay: 0.3,
              speed: 0.5,
            },
            ease: 'none',
          });
        },
      });

      // ── Feature paragraphs — sequential: number → title → text → next ───
      ScrollTrigger.create({
        trigger: middleRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const featureEls = middleRef.current.querySelectorAll('[data-feature]');

          const itemDuration = 0.18;
          const itemGap      = 0.08;
          const featureGap   = 0.18;

          let cursor = 0.1;

          featureEls.forEach((feature) => {
            const number = feature.querySelector('[data-feature-number]');
            const title  = feature.querySelector('[data-feature-title]');
            const text   = feature.querySelector('[data-feature-text]');

            gsap.fromTo(number,
              { y: 12, opacity: 0 },
              { y: 0, opacity: 0.18, duration: itemDuration, delay: cursor, ease: 'power2.out' }
            );
            cursor += itemDuration + itemGap;

            gsap.fromTo(title,
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: itemDuration, delay: cursor, ease: 'power2.out' }
            );
            cursor += itemDuration + itemGap;

            gsap.fromTo(text,
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: itemDuration, delay: cursor, ease: 'power2.out' }
            );
            cursor += itemDuration + featureGap;
          });
        },
      });

      // ── Badges ───────────────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: badgesRef.current,
        start: 'top 90%',
        onEnter: () => {
          badgeRefs.current.forEach((badge) => {
            if (!badge) return;

            const randomDelay    = Math.random() * 0.8;
            const randomDuration = 0.4 + Math.random() * 0.6;
            const tl = gsap.timeline({ delay: randomDelay });

            tl.to(badge, {
              opacity: 1,
              scale: 1,
              duration: randomDuration * 0.6,
              ease: 'back.out(1.2)',
            });

            const randomEffect = Math.floor(Math.random() * 4);

            switch (randomEffect) {
              case 0:
                tl.to(badge, { scale: 1.3, duration: 0.4, ease: 'power1.inOut' })
                  .to(badge, { scale: 1, duration: 0.5, ease: 'bounce.out' });
                break;
              case 1:
                tl.to(badge, { rotation: 360, scale: 1.2, duration: 0.6, ease: 'power2.inOut' })
                  .to(badge, { rotation: 0, scale: 1, duration: 0.7, ease: 'power2.out' });
                break;
              case 2:
                tl.to(badge, { scale: 1.2, rotation: 5, duration: 0.1 })
                  .to(badge, { scale: 0.9, rotation: -5, duration: 0.1 })
                  .to(badge, { scale: 1.1, rotation: 2, duration: 0.1 })
                  .to(badge, { scale: 1, rotation: 0, duration: 0.2, ease: 'elastic.out(1, 0.3)' });
                break;
              case 3:
                tl.to(badge, { scale: 1.25, skewX: 5, duration: 0.15, ease: 'sine.inOut' })
                  .to(badge, { scale: 0.95, skewX: -5, duration: 0.15, ease: 'sine.inOut' })
                  .to(badge, { scale: 1.15, skewX: 2, duration: 0.1, ease: 'sine.inOut' })
                  .to(badge, { scale: 1, skewX: 0, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
                break;
            }

            tl.to(badge, {
              y: -(5 + Math.random() * 8),
              duration: 1.5 + Math.random() * 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 0.2 + Math.random() * 0.4,
            });
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="pendo" ref={sectionRef}>
      <Container>
        <Header>
          <HeaderLeft ref={headerRef}>
            <Label>
              <span ref={certifiedRef}>Certified</span>
            </Label>
            <Title>Pendo Consultant</Title>
          </HeaderLeft>
          <Subtitle>
            <strong>Certified Pendo developer</strong> and consultant with over two years hands-on experience. { }
            <HireCTA to="/pendo-consultant">
              Hire me as your Pendo consultant
            </HireCTA>
          </Subtitle>
        </Header>

        <MiddleRow ref={middleRef}>
          <FeatureList>
            {features.map((feature, index) => (
              <Feature key={index} data-feature>
                <FeatureNumber data-feature-number>{feature.number}</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle data-feature-title>{feature.title}</FeatureTitle>
                  <FeatureText data-feature-text>
                    {feature.before}
                    <FeatureLink to="/pendo-consultant">{feature.link}</FeatureLink>
                    {feature.after}
                  </FeatureText>
                </FeatureContent>
              </Feature>
            ))}            
          </FeatureList>

          <GraphContainer>
            <GraphImage src={pendoGraph} alt="Pendo Analytics Graph" />
            <p style={{ fontStyle: 'italic', fontSize: '18px', marginTop: '1rem', fontWeight: '600' }}>
              "Get measurable results faster"
            </p>
          </GraphContainer>
        </MiddleRow>

        <BadgesContainer ref={badgesRef}>
          {certImages.map((cert, i) => (
            <Badge key={i} ref={el => badgeRefs.current[i] = el}>
              <a
                href="https://www.credly.com/users/victor-blanco.4783f91c"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <BadgeImg src={cert} alt={`Pendo Certification ${i + 1}`} />
              </a>
            </Badge>
          ))}
        </BadgesContainer>

      </Container>
    </Section>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled.section.attrs({ className: 'pendoExpert-Section' })`
  min-height: 90vh;
  margin-bottom: 5rem;

  @media (max-width: 968px) {
    min-height: auto;
    margin-bottom: 2rem;
  }
`;

const Container = styled.div.attrs({ className: 'pendoExpert-Container' })`
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

const Header = styled.div.attrs({ className: 'pendoExpert-Header' })`
  margin-bottom: 1.2rem;
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

const HeaderLeft = styled.div.attrs({ className: 'pendoExpert-HeaderLeft' })``;

const Label = styled.span.attrs({ className: 'pendoExpert-Label' })`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
`;

const Title = styled.h2.attrs({ className: 'pendoExpert-Title' })`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
  letter-spacing: 0;
`;

const Subtitle = styled.p.attrs({ className: 'pendoExpert-Subtitle' })`
  font-size: 20px;
  color: #282828;
  max-width: 460px;
  margin-top: 2rem;

  @media (max-width: 968px) {
    font-size: 18px;
  }
  @media (max-width: 426px) {
    margin-top: 0;
  }

  strong {
    font-weight: 800;
  }
`;

const MiddleRow = styled.div.attrs({ className: 'pendoExpert-MiddleRow' })`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-evenly;
  gap: 40px;
  padding: 2rem 0;

  @media (max-width: 1200px) {
    gap: 40px;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const FeatureList = styled.div.attrs({ className: 'pendoExpert-FeatureList' })`
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
  max-width: 50%;

  @media (max-width: 968px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const Feature = styled.div.attrs({ className: 'pendoExpert-Feature' })`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 90%;
  margin: 0 auto;
`;

const FeatureNumber = styled.span.attrs({ className: 'pendoExpert-FeatureNumber' })`
  font-weight: 700;
  color: #FF3863;
  line-height: 1;
  flex-shrink: 0;
  width: 64px;
  opacity: 0;
  letter-spacing: -2px;
  padding-top: 2px;
  font-size: 64px;
  min-width: 48px;
  text-align: center;

  @media (max-width: 968px) {
    width: 42px;
  }
  @media (max-width: 426px) {
    width: 44px;
  }
`;

const FeatureContent = styled.div.attrs({ className: 'pendoExpert-FeatureContent' })`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.h3.attrs({ className: 'pendoExpert-FeatureTitle' })`
  font-size: 24px;
  font-weight: 700;
  color: #282828;
  margin: 0;
  line-height: 1.3;
  opacity: 0;
`;

const FeatureText = styled.p.attrs({ className: 'pendoExpert-FeatureText' })`
  font-size: 20px;
  line-height: 1.6;
  color: #555;
  margin: 0;
  opacity: 0;
  max-width: 682px;

  @media (max-width: 968px) {
    font-size: 18px;
  }
`;

const FeatureLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;

  &:hover {
    border-bottom-color: #FF3863;
  }
`;

const HireCTA = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  color: #FF3863;
  text-decoration: none;
  max-width: 100%;
  padding-top: 0.5rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, opacity 0.2s ease;

  &:hover {
    border-bottom-color: #FF3863;
    opacity: 0.8;
  }
`;

const GraphContainer = styled.div.attrs({ className: 'pendoExpert-GraphContainer' })`
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    max-width: 100%;
    width: 100%;
  }
`;

const GraphImage = styled.img.attrs({ className: 'pendoExpert-GraphImage' })`
  aspect-ratio: 800 / 500;
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(40, 40, 40, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 968px) {
    max-height: 300px;
    box-shadow: none;
  }
  @media (max-width: 426px) {
    padding: 0 1.4rem;
  }
`;

const BadgesContainer = styled.div.attrs({ className: 'pendoExpert-BadgesContainer' })`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 1415px) {
    gap: 10px;
  }
  @media (max-width: 1102px) {
    width: 478px;
    margin: 0 auto;
  }
  @media (max-width: 668px) {
    width: 100%;
    gap: 20px;
  }
`;

const Badge = styled.div.attrs({ className: 'pendoExpert-Badge' })`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(40, 40, 40, 0.2);
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0.8);

  @media (max-width: 1331px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 968px) {
    width: 90px;
    height: 90px;
  }
`;

const BadgeImg = styled.img.attrs({ className: 'pendoExpert-BadgeImg' })`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
`;