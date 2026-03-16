// Testimonials.jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import reviewBg from "../assets//review-bg.png";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #282828;
  position: relative;
  padding: 4rem 0 6rem 0;
  min-height: 600px;
  border-bottom: 1px black solid;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${reviewBg}) center/cover;
    opacity: 0.8;
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  
  h2 {
    font-size: 39px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 400px;
  z-index: 1;
`;

const CardWrapper = styled.div`
  position: absolute;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => {
    if (props.$position === 0) return 'translateX(0) scale(1)';
    if (props.$position === -1) return 'translateX(-120%) scale(0.85)';
    if (props.$position === 1) return 'translateX(120%) scale(0.85)';
    return 'translateX(0) scale(0)';
  }};
  opacity: ${props => {
    if (props.$position === 0) return 1;
    if (props.$position === -1 || props.$position === 1) return 0.4;
    return 0;
  }};
  z-index: ${props => props.$position === 0 ? 10 : 1};
  pointer-events: ${props => props.$position === 0 ? 'auto' : 'none'};
`;

const Card = styled.div`
  background: ${props => props.$isCenter ? '#FFFEFA' : 'rgba(255, 254, 250, 0.1)'};
  backdrop-filter: ${props => props.$isCenter ? 'none' : 'blur(10px)'};
  border: ${props => props.$isCenter ? 'none' : '2px solid rgba(255, 254, 250, 0.2)'};
  border-radius: 6px;
  padding: 1.2rem 1.8rem;
  width: 390px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isCenter 
    ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
    : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  color: ${props => props.$isCenter ? '#282828' : '#FFFEFA'};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.8rem;
`;

const StarIcon = styled(Star)`
  fill: #ef4444;
  color: #ef4444;
  size: 1.4rem;
`;

const Logo = styled.div`
  width: 90px;
  height: 50px;
  background: ${props => props.$isCenter ? 'rgba(40, 40, 40, 0.1)' : 'rgba(255, 254, 250, 0.2)'};
  border-radius: 6px;
`;

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: inherit;
  text-align: left;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: inherit;
  text-align: left;
  margin: 0 0 0.5rem 0;
  flex-grow: 1;
  line-height: 1.4;
  font-weight: 500;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #FF3863;
  opacity: 0.9;
  width: 94%;
  margin: 0 auto;
  margin-bottom: 1.6rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: inherit;
`;

const Company = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: inherit;
`;

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      title: "you can trust Victor",
      subtitle: "Some subtitle and more Some subtitle and more Some subtitle and more",
      name: "Helene C.",
      company: "N-able Inc"
    },
    {
      id: 2,
      rating: 5,
      title: "He's a gem!",
      subtitle: "If you're looking for a good developer I'd recommend Victor. He's genuinely a pleasure to work with, and I've had the chance to work with him at OMS.",
      name: "Stephen S.",
      company: "Orders Made Simple"
    },
    {
      id: 3,
      rating: 5,
      title: "Excellent Work!",
      subtitle: "Professional, creative, and always on time. Highly recommend for any project needs.",
      name: "Lorraine M.",
      company: "The Orchard Bar"
    },
    {
      id: 4,
      rating: 5,
      title: "Outstanding!",
      subtitle: "Delivered beyond what we asked for. Communication was clear throughout the process.",
      name: "Victoria W.",
      company: "Loka Care"
    },
    {
      id: 5,
      rating: 5,
      title: "Highly Recommended!",
      subtitle: "Incredible attention to detail and creative solutions. Will definitely work together again.",
      name: "Sujin Kim",
      company: "Sujin K."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getVisibleReviews = () => {
    const visible = [];
    // Show 3 cards: left (-1), center (0), right (1)
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i
      });
    }
    return visible;
  };

  return (
    <Section ref={sectionRef}>
      <Container>
        <Header ref={headerRef}>
          <h2>Don't take <br />my word for it</h2>
        </Header>
        
        <CardsContainer>
          {getVisibleReviews().map((testimonial) => (
            <CardWrapper 
              key={`${testimonial.id}-${testimonial.position}`} 
              $position={testimonial.position}
            >
              <Card $isCenter={testimonial.position === 0}>
                <Row>
                  <Stars>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} size={22} />
                    ))}
                  </Stars>
                  <Logo $isCenter={testimonial.position === 0} />
                </Row>
                <Title>{testimonial.title}</Title>
                <Subtitle>{testimonial.subtitle}</Subtitle>
                <Divider />
                <Footer>
                  <Name>{testimonial.name}</Name>
                  <Company>{testimonial.company}</Company>
                </Footer>
              </Card>
            </CardWrapper>
          ))}
        </CardsContainer>
      </Container>
    </Section>
  );
};