import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = styled.section`
  min-height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 20px;
  margin-top: -2rem;
`;

const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFEFA;
  border-radius: 50px;
  border: 2px solid #282828;
  font-size: 16px;
  color: #282828;
  margin-bottom: 40px;
  font-weight: 600;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #FF3863;
  border-radius: 50%;
  animation: breathe 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
  
  @keyframes breathe {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 0 6px rgba(255, 56, 99, 0);
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0);
    }
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4%;
  color: #282828;
  position: relative;
  z-index: 1;
  
  span {
    color: #FF3863;
    display: block;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftColumn = styled.div`
  max-width: 420px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  width: 480px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 112px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #282828;
  max-width: 540px;
  margin-bottom: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  flex-direction: row;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: #282828;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 176px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
        border: 2px solid #FF3863;
        background: #FFFEFA;
    color: #FF3863;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFEFA;
  color: #282828;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #282828;
  transition: all 0.3s ease;
  min-width: 176px;
  
  &:hover {
transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
        border-color: #FF3863;    
        color: #FF3863;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  color: #282828;
`;

const AvatarGroup = styled.div`
  display: flex;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #FFFEFA;
    margin-left: -8px;
    color: #282828;
    
    &:first-child {
      margin-left: 0;
    }
  }
`;

const TitleLine = styled.span`
  display: block;
  overflow: hidden;
`;

const TitleText = styled.span`
  display: inline-block;
`;

const AvatarRing = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eaeaea;
  padding: 2px;
  margin-left: ${p => p.$first ? '0' : '-12px'};
`;

const AvatarInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${p => p.$color};
`;

export const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(line1Ref.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(line2Ref.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      )
      .fromTo(line3Ref.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroSection id="home" ref={heroRef}>
      <Container>
        <Badge>
          <Dot />
          Available for work
        </Badge>
        
        <TitleWrapper>
          <Title>
            <TitleLine>
              <TitleText ref={line1Ref} style={{ color: '#282828' }}>Web Developer &</TitleText>
            </TitleLine>
            <TitleLine>
              <TitleText ref={line2Ref} style={{ color: '#FF3863' }}>Pendo Consultant</TitleText>
            </TitleLine>
          </Title>
        </TitleWrapper>
        
        <ContentWrapper>
          <LeftColumn>
            <Subtitle ref={line3Ref}>
              I specialize in designing and building websites using modern technologies. 
              I provide expert Pendo services, from audit and setup to expert custom guides, Analytics & Reporting.
            </Subtitle>
          </LeftColumn>
          
          <RightColumn>
            <RightContent>
              <ButtonGroup>
                <PrimaryButton href="#works">
                  View Works
                  <ArrowRight size={18} />
                </PrimaryButton>
                <SecondaryButton href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Calendar size={18} />
                  Book a Call
                </SecondaryButton>
              </ButtonGroup>
              
              <TrustBadge>
                <AvatarGroup>
                  <AvatarRing $first>
                    <AvatarInner $color="#DBE1E8" />
                  </AvatarRing>
                  <AvatarRing>
                    <AvatarInner $color="#B8C4D1" />
                  </AvatarRing>
                  <AvatarRing>
                    <AvatarInner $color="#282828" />
                  </AvatarRing>
                </AvatarGroup>
                <span>Trusted by clients and partners worldwide</span>
              </TrustBadge>
            </RightContent>
          </RightColumn>
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
};
