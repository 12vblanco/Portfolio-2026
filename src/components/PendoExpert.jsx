import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import cert2 from '..//assets/pendoCert/cert2.png';
import cert3 from '..//assets/pendoCert/cert3.png';
import cert4 from '..//assets/pendoCert/cert4.png';
import cert5 from '..//assets/pendoCert/cert5.png';
import cert6 from '..//assets/pendoCert/cert6.png';
import cert7 from '..//assets/pendoCert/cert7.png';
import cert8 from '..//assets/pendoCert/cert8.png';
import pendoIcon from '..//assets/pendoCert/pendo-icon.png';
import cert1 from '../assets/pendoCert/cert1.png';
import pendoGraph from '../assets/pendoCert/pendo-graph-2.jpg';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  padding: 24px 0 48px;
  margin-bottom: 5rem;
`;

const Container = styled.div`
  max-width: 1905px;
  margin: 0 auto;
  padding: 0 80px 0 136px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

/* Row 1: Header — left aligned */
const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(48px, 8vw, 61px);
  font-weight: 700;
  color: #FF3863;
  margin: 0;
`;

const MiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 60px;

  @media (max-width: 1200px) {
    gap: 40px;
  }

  @media (max-width: 968px) {
    flex-direction: column-reverse;
    gap: 60px;

  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  max-width: 540px;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const Feature = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 6px;
  background: rgba(255, 56, 99, 0.1);

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const PendoIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FeatureText = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #282828;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const GraphContainer = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    max-width: 100%;
    width: 100%;
  }
`;

const GraphImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(40, 40, 40, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

/* Row 3: Badges — centred */
const BadgesContainer = styled.div`
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

const Badge = styled.div`
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

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

const BadgeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const features = [
  'Pendo expert specialising in the whole lifecycle, from installations to analytics and reporting',
  'Deep expertise in Pendo implementation, visitor tracking, and metadata configuration',
  'Certified in Product Analytics, Product Discovery, and Pendo Administration',
];

const certImages = [cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8];

export const PendoExpert = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const middleRef = useRef(null);
  const badgesRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, certImages.length);

    const ctx = gsap.context(() => {
      const sectionTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        onEnter: () => {
          // Header animation
          gsap.fromTo(headerRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 }
          );

          // Middle section animation
          gsap.fromTo(middleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.15 }
          );

          // Random animations for each certification badge
          badgeRefs.current.forEach((badge) => {
            if (!badge) return;

            const randomDelay = Math.random() * 0.8;
            const randomDuration = 0.4 + Math.random() * 0.6;

            const tl = gsap.timeline({
              delay: randomDelay,
            });

            tl.to(badge, {
              opacity: 1,
              scale: 1,
              duration: randomDuration * 0.6,
              ease: 'back.out(1.2)',
            });

            const randomEffect = Math.floor(Math.random() * 4);
            
            switch(randomEffect) {
              case 0:
                tl.to(badge, {
                  scale: 1.3,
                  duration: 0.4,
                  ease: 'power1.inOut',
                }).to(badge, {
                  scale: 1,
                  duration: 0.5,
                  ease: 'bounce.out',
                });
                break;
                
              case 1:
                tl.to(badge, {
                  rotation: 360,
                  scale: 1.2,
                  duration: 0.6,
                  ease: 'power2.inOut',
                }).to(badge, {
                  rotation: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: 'power2.out',
                });
                break;
                
              case 2:
                tl.to(badge, {
                  scale: 1.2,
                  rotation: 5,
                  duration: 0.1,
                }).to(badge, {
                  scale: 0.9,
                  rotation: -5,
                  duration: 0.1,
                }).to(badge, {
                  scale: 1.1,
                  rotation: 2,
                  duration: 0.1,
                }).to(badge, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.2,
                  ease: 'elastic.out(1, 0.3)',
                });
                break;
                
              case 3:
                tl.to(badge, {
                  scale: 1.25,
                  skewX: 5,
                  duration: 0.15,
                  ease: 'sine.inOut',
                }).to(badge, {
                  scale: 0.95,
                  skewX: -5,
                  duration: 0.15,
                  ease: 'sine.inOut',
                }).to(badge, {
                  scale: 1.15,
                  skewX: 2,
                  duration: 0.1,
                  ease: 'sine.inOut',
                }).to(badge, {
                  scale: 1,
                  skewX: 0,
                  duration: 0.3,
                  ease: 'elastic.out(1, 0.3)',
                });
                break;
            }

            const floatAmount = 5 + Math.random() * 8;
            const floatDuration = 1.5 + Math.random() * 1.5;
            const floatDelay = 0.2 + Math.random() * 0.4;
            
            tl.to(badge, {
              y: -floatAmount,
              duration: floatDuration,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: floatDelay,
            });
          });
        },
      });

      return () => {
        sectionTrigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="pendo" ref={sectionRef}>
      <Container>

        <HeaderRow ref={headerRef}>
          <Label>Certified</Label>
          <Title>Pendo Consultant</Title>
        </HeaderRow>

        <MiddleRow ref={middleRef}>
          <FeatureList>
            {features.map((feature, index) => (
              <Feature key={index}>
                <FeatureIcon>
                  <PendoIconImg src={pendoIcon} alt="Pendo" />
                </FeatureIcon>
                <FeatureText>{feature}</FeatureText>
              </Feature>
            ))}
          </FeatureList>

          <GraphContainer>
            <GraphImage src={pendoGraph} alt="Pendo Analytics Graph" />
          </GraphContainer>
        </MiddleRow>

        <BadgesContainer ref={badgesRef}>
          {certImages.map((cert, i) => (
            <Badge 
              key={i} 
              ref={el => badgeRefs.current[i] = el}
            >
              <BadgeImg src={cert} alt={`Pendo Certification ${i + 1}`} />
            </Badge>
          ))}
        </BadgesContainer>

      </Container>
    </Section>
  );
};