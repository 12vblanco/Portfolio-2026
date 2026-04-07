import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const experiences = [
  {
    position: 'Pendo Web Developer',
    company: 'N-able Inc.',
    date: 'April 2024 - October 2025',
    side: 'left',
    description: "Pendo Specialist & Web Developer for N-able Inc. \n\nExpertise in developing in-app guides and announcements using Pendo's Visual Design Studio and custom JavaScript, CSS & HTML, ensuring adherence to brand guidelines and user experience best practices. Led projects with cross-functional teams and stakeholders, including product, UX, and customer success teams, to deliver targeted user engagement campaigns and onboarding flows.",
  },
  {
    position: 'Junior Software Engineer',
    company: 'Orders Made Simple',
    date: 'July 2021 - September 2023',
    side: 'right',
    description: 'Full-Stack Developer and acting designer in a start-up environment. \n\nAdopted new technologies while working autonomously to develop scalable applications using the MERN stack (React JS/Native with Redux Toolkit, MongoDB, and Node.js). \n\nDemonstrated versatility across technical and creative aspects of product development, from feature conceptualisation to implementation.',
  },
  {
    position: 'Website Manager',
    company: 'Edinburgh College',
    date: 'March 2021 - July 2023',
    side: 'left',
    description: 'I owned the whole process from design to execution.\n\nManaged the full lifecycle of a WordPress site for Edinburgh Council, creating a platform for community groups in North Edinburgh to connect and share information. Enhanced functionality by leveraging existing modules and customizing plugins to improve styling, user engagement, and overall performance.\n\nCollaborated effectively with stakeholders to deliver tailored website customizations, ensuring a user-centric platform that met community needs.',
  },
  {
    position: 'Bsc (Hons) Web Design & Development',
    company: 'Edinburgh Napier University',
    date: 'September 2020 - December 2024',
    side: 'right',
    description: 'First Honours degree and class medal for best academic performance!!\n\nComprehensive degree covering key areas as web and mobile programming, interaction design, and UX. Studied modules in Practical Interaction Design, Web Technologies, and UX Research Methods. Developed skills in designing visual interfaces, database development, and working on collaborative projects, culminating in a dissertation titled "Performance comparison of an art portfolio website built in Vue, Angular and React using common browser-based tools."',
  },
];

export const Experience = () => {
  const sectionRef   = useRef(null);
  const itemsRef     = useRef([]);
  const dotsRef      = useRef([]);
  const cardRefs     = useRef([]);
  const labelRef     = useRef(null);
  const [expanded, setExpanded]         = useState(null);
  const [displayYears, setDisplayYears] = useState(1);

  const actualYears = Math.floor((new Date() - new Date(2020, 8)) / (1000 * 60 * 60 * 24 * 365.25));

  const toggle = (index) => {
    const isOpening = expanded !== index;
    setExpanded(prev => prev === index ? null : index);

    if (isOpening) {
      setTimeout(() => {
        const card = cardRefs.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardHeight = rect.height;

        if (rect.bottom > viewportHeight || rect.top < 0) {
          card.scrollIntoView({
            behavior: 'smooth',
            block: cardHeight > viewportHeight * 0.8 ? 'start' : 'nearest',
          });
        }
      }, 520);
    }
  };

  // ── Timeline card & dot animations ────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: experiences[index].side === 'left' ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              toggleActions: 'restart none none restart',
            },
          }
        );
      });

      dotsRef.current.forEach((dot) => {
        gsap.fromTo(dot,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 95%',
              toggleActions: 'restart none none restart',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Header: scramble label + year counter ─────────────────────────────────
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Scramble the label — element starts empty in JSX
        gsap.to(labelRef.current, {
          duration: 1.6,
          delay: 0.2,
          scrambleText: {
            text: 'Professional & Academic',
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            revealDelay: 0.4,
            speed: 0.6,
          },
          ease: 'none',
        });

        // Year counter
        let current = 0;
        const interval = setInterval(() => {
          current += 1;
          setDisplayYears(current);
          if (current >= actualYears) clearInterval(interval);
        }, 400);
      },
    });

    return () => trigger.kill();
  }, [actualYears]);

  return (
    <Section id="experience" ref={sectionRef}>
      <Container>
        <Header>
          <HeaderLeft>
            {/* Empty — GSAP ScrambleTextPlugin writes the text in from scratch */}
            <Label ref={labelRef} aria-label="Professional & Academic" />
            <Title>Experience</Title>
          </HeaderLeft>
          <Subtitle>
            A mix of freelance work, academic achievement, and in-house team experience
            over the past <YearCount key={displayYears}>{displayYears} years.</YearCount>
          </Subtitle>
        </Header>

        <TimelineContainer>
          <TimelineLine />
          {experiences.map((exp, index) => {
            const isExpanded = expanded === index;

            return (
              <TimelineItem
                key={index}
                ref={el => itemsRef.current[index] = el}
                $side={exp.side}
              >
                <Card
                  ref={el => cardRefs.current[index] = el}
                  $expanded={isExpanded}
                  $side={exp.side}
                  onClick={() => toggle(index)}
                >
                  <CardHeader>
                    <TitleSection>
                      <JobTitle>{exp.position}</JobTitle>
                      <CompanyRow>
                        <CompanyName>{exp.company}</CompanyName>
                        {exp.location && <Location>• {exp.location}</Location>}
                      </CompanyRow>
                      <DateText>{exp.date}</DateText>
                    </TitleSection>
                  </CardHeader>

                  <ExpandContent $expanded={isExpanded}>
                    <Description>{exp.description}</Description>
                  </ExpandContent>

                  <ExpandHint $expanded={isExpanded}>
                    {isExpanded ? '↑ less' : '↓ more'}
                  </ExpandHint>
                </Card>

                <Dot
                  ref={el => dotsRef.current[index] = el}
                  $expanded={isExpanded}
                />
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Container>
    </Section>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const blip = keyframes`
  0%   { opacity: 0; transform: translateY(-6px) scale(0.85); }
  60%  { opacity: 1; transform: translateY(2px) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const Section = styled.section`
  /* padding: 60px 0 80px; */
`;

const Container = styled.div.attrs({ className: 'experience-Container' })`
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

const Header = styled.div.attrs({ className: 'experience-Header' })`
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

const HeaderLeft = styled.div``;

const Label = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
  min-height: 1.2em; /* reserves space before text appears so Title doesn't jump */
`;

const Title = styled.h2.attrs({ className: 'experience-Title' })`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateX(-50px);
  animation: experienceTitleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;

  @keyframes experienceTitleIn {
    to { opacity: 1; transform: translateX(0); }
  }
`;

const Subtitle = styled.p.attrs({ className: 'experience-Subtitle' })`
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

const YearCount = styled.span`
  font-weight: 700;
  display: inline-block;
  animation: ${blip} 0.3s ease;
`;

const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 10px 0;
  @media (max-width: 968px) {
   
    padding: 2rem 4rem;
  }
  @media (max-width: 426px) {
   
    padding: 1rem;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #FF3863, #ff00cc);
  pointer-events: none;
  z-index: 0;

@media (max-width: 968px) {    left: 76px;
  }
@media (max-width: 426px) {    left: 28px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  justify-content: ${p => p.$side === 'left' ? 'flex-start' : 'flex-end'};
  width: 100%;

@media (max-width: 968px) {    justify-content: flex-end;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
  width: ${p => p.$expanded ? '22px' : '14px'};
  height: ${p => p.$expanded ? '22px' : '14px'};
  background: #FF3863;
  border: 3px solid #FFFEFA;
  border-radius: 50%;
  z-index: 3;
  box-shadow: 0 0 0 2px #FF3863;
  transition: all 0.3s ease;

@media (max-width: 968px) {    left: 12px;
    top: 20px;
  }
`;

const Card = styled.div`
  width: calc(50% - 24px);
  background: #FFFEFA;
  border-radius: 24px;
  padding: 22px 24px;
  border: 1px solid ${p => p.$expanded ? '#FF3863' : '#e5e5e5'};
  box-shadow: ${p => p.$expanded
    ? '0 20px 40px rgba(255, 56, 99, 0.15)'
    : '0 4px 15px rgba(40, 40, 40, 0.03)'};
  cursor: pointer;
  transition: border 0.4s ease, box-shadow 0.4s ease;
  box-sizing: border-box;
  margin-left: ${p => p.$side === 'left' ? '0' : '24px'};
  margin-right: ${p => p.$side === 'right' ? '0' : '24px'};
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.08);
    border-color: #FF3863;
  }

@media (max-width: 968px) {    width: calc(100% - 36px);
    margin-left: 36px !important;
    margin-right: 0 !important;
    border-radius: 16px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const JobTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #282828;
  margin: 0;
`;

const CompanyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: #282828;
`;

const Location = styled.span`
  color: #282828;
  font-size: 14px;
  font-weight: 400;
`;

const DateText = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

const ExpandContent = styled.div`
  overflow: hidden;
  max-height: ${p => p.$expanded ? '600px' : '0'};
  opacity: ${p => p.$expanded ? 1 : 0};
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s ease,
              margin-top 0.4s ease;
  margin-top: ${p => p.$expanded ? '16px' : '0'};
`;

const Description = styled.p`
  font-size: 18px;
  color: #282828;
  line-height: 1.7;
  margin: 0;
  white-space: pre-line;
`;

const ExpandHint = styled.span`
  display: block;
  margin-top: 12px;
  font-size: 13px;
  color: #FF3863;
  font-weight: 600;
  opacity: ${p => p.$expanded ? 1 : 0.6};
  transition: opacity 0.2s ease;
  text-align: right;
  letter-spacing: 0.5px;
`;