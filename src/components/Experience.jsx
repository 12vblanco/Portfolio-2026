import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

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
    date: 'July 2021 - September 2023 ',
    side: 'right',
    description: 'Full-Stack Developer and acting designer in a start-up environment. \n\nAdopted new technologies while working autonomously to develop scalable applications using the MERN stack (React JS/Native with Redux Toolkit, MongoDB, and Node.js). \n\nDemonstrated versatility across technical and creative aspects of product development, from feature conceptualisation to implementation.',
  },
   {
    position: 'Website Manager',
    company: 'Edinburgh College',
    date: 'March 2021 - July 2023',
    side: 'left',
    description: 'I owned the whole process from design to execution.\n\nManaged the full lifecycle of a WordPress site for Edinburgh Council, creating a  platform for community groups in North Edinburgh to connect and share information. Enhanced  functionality by leveraging existing modules and customizing plugins to improve styling, user engagement, and overall performance.  \n\nCollaborated effectively with stakeholders to deliver tailored website customizations, ensuring a user-centric platform that met community needs.'
  },
  {
        position: 'Bsc (Hons) Web Design & Development',
company: 'Edinburgh Napier University',
    location: '',
    date: 'September 2020 - December 2024',
    side: 'right',
    description: 'First Honours degree and class medal for best academic performance!!\n\nComprehensive degree covering key areas as web and mobile programming, interaction design, and UX. Studied modules in Practical Interaction Design, Web Technologies, and UX Research Methods. Developed skills in designing visual interfaces, database development, and working on collaborative projects, culminating in a dissertation titled "Performance comparison of an art portfolio website built in Vue, Angular and React using common browser-based tools.',
  },
];

export const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);
  const dotsRef    = useRef([]);
  const [expanded, setExpanded] = useState(null);

  const toggle = (index) => {
    setExpanded(prev => prev === index ? null : index);
  };

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
              toggleActions: 'play none none reverse',
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
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience" ref={sectionRef}>
      <Container>
        <Header>
          <HeaderLeft>
            <Label>Professional & Academic</Label>
            <Title>Experience</Title>
          </HeaderLeft>
          <Subtitle>
            As well as freelancing I completed university and formed part of
            different professional teams during the last 5 years
          </Subtitle>
        </Header>

        <TimelineContainer>
          <TimelineLine />
          {experiences.map((exp, index) => {
            const isLast = index === experiences.length - 1;
            const isFirst = index === 0;
            const isExpanded = expanded === index;
            
            return (
              <TimelineItem
                key={index}
                ref={el => itemsRef.current[index] = el}
                $side={exp.side}
                $isExpanded={isExpanded}
                $isLast={isLast}
                $isFirst={isFirst}
              >
                <Card
                  data-card
                  $expanded={isExpanded}
                  $side={exp.side}
                  onClick={() => toggle(index)}
                  $isLast={isLast}
                  $isFirst={isFirst}
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
                  $isLast={isLast}
                  $isFirst={isFirst}
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

const Section = styled.section`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1415px) {
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

const Container = styled.div`
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 80px 20px 136px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 1415px) {
    height: auto;
    padding: 40px 32px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 40px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled.div``;

const Label = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: clamp(48px, 8vw, 61px);
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 560px;
  margin-top: 2rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
justify-content: center;
  gap: 1rem;  
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  min-height: 0;
  padding: 10px 0;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 16px;
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
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  justify-content: ${p => p.$side === 'left' ? 'flex-start' : 'flex-end'};
  width: 100%;
  height: auto;
  min-height: 0;
  flex: ${p => p.$isExpanded ? '1' : '0 0 auto'};
  
  ${p => p.$isExpanded && p.$isLast && `
    margin-top: auto;
    margin-bottom: 0;
    align-items: flex-end;
  `}
  
  ${p => p.$isExpanded && p.$isFirst && `
    margin-top: 0;
    margin-bottom: auto;
    align-items: flex-start;
  `}
  
  ${p => p.$isExpanded && !p.$isFirst && !p.$isLast && `
    margin: auto 0;
    align-items: center;
  `}

  @media (max-width: 768px) {
    justify-content: center;
    flex: 0 0 auto;
    margin: 0 !important;
    align-items: flex-start !important;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  width: ${p => p.$expanded ? '24px' : '16px'};
  height: ${p => p.$expanded ? '24px' : '16px'};
  background: #FF3863;
  border: 3px solid #FFFEFA;
  border-radius: 50%;
  z-index: 3;
  box-shadow: 0 0 0 2px #FF3863;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    top: -8px;
    z-index: 3;
    transform: translateX(-50%);
  }
`;

const Card = styled.div`
  width: calc(50% - 40px);
  max-width: 540px;
  background: #FFFEFA;
  border-radius: 24px;
  padding: 22px 28px;
  border: 1px solid ${p => p.$expanded ? '#FF3863' : '#e5e5e5'};
  box-shadow: ${p => p.$expanded
    ? '0 20px 40px rgba(255, 56, 99, 0.15)'
    : '0 4px 15px rgba(40, 40, 40, 0.03)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  margin-left: ${p => p.$side === 'left' ? '0' : '40px'};
  margin-right: ${p => p.$side === 'right' ? '0' : '40px'};
  display: flex;
  flex-direction: column;
  
  ${p => p.$expanded && p.$isLast && `transform-origin: bottom center;`}
  ${p => p.$expanded && p.$isFirst && `transform-origin: top center;`}
  ${p => p.$expanded && !p.$isFirst && !p.$isLast && `transform-origin: center;`}

  &:hover {
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.08);
    border-color: #FF3863;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin: 0 !important;
    border-radius: 16px;
    background: #FFFEFA;
    z-index: 2;
    position: relative;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
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
  max-height: ${p => p.$expanded ? '350px' : '0'};
  opacity: ${p => p.$expanded ? 1 : 0};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: ${p => p.$expanded ? '16px' : '0'};
  flex-shrink: 0;
`;

const Description = styled.p`
  font-size: 15px;
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
  flex-shrink: 0;
`;