import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  padding: 24px 0;
  background: #282828;
  color: #FFFEFA;
  height: 64vh;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;



const Title = styled.h2`
  font-size: clamp(48px, 8vw, 61px);
  font-weight: 700;
  color: #FFFEFA;
  margin-bottom: 16px;
  
  span {
    display: block;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Quote = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF3863, #FF8A00);
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: #FFFEFA;
`;

const AuthorCompany = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
`;

const testimonials = [
  {
    quote: '"Excellent work! Professional, creative, and always on time. Highly recommend for any project."',
    author: 'Lorraine M.',
    company: 'The Orchard Bar',
  },
  {
    quote: '"Outstanding! Delivered beyond what we asked for. Communication was clear throughout."',
    author: 'Victoria W.',
    company: 'Loka Care',
  },
  {
    quote: '"Highly Recommended! Incredible attention to detail and creative solutions. Will work again."',
    author: 'Sujik Kim',
    company: 'Sujik K.',
  },
];

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container>
        <Header>
          <Title>
            <span>Don't take</span>
            <span>my word for it</span>
          </Title>
        </Header>
        
        <Grid>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              ref={el => cardsRef.current[index] = el}
            >
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FF3863" color="#FF3863" />
                ))}
              </Stars>
              <Quote>{testimonial.quote}</Quote>
              <Author>
                <Avatar />
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorCompany>{testimonial.company}</AuthorCompany>
                </AuthorInfo>
              </Author>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
