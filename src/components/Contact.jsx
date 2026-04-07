import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dribbble, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart } from '../assets/icons/Heart';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section.attrs({ className: 'contact-Section' })`
  /* padding: 120px 0 80px; */
  max-height: 30vh;
`;

const Container = styled.div.attrs({ className: 'contact-Container' })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 1rem 2rem;
  text-align: center;
  @media (max-width: 426px) {
    padding: 1.2rem;
  }
`;

const Title = styled.h2.attrs({ className: 'contact-Title' })`
  font-weight: 700;
  color: #282828;
  margin-bottom: 24px;
`;

const SocialLinks = styled.div.attrs({ className: 'contact-SocialLinks' })`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 64px;
`;

const SocialLink = styled.a.attrs({ className: 'contact-SocialLink' })`
  width: 56px;
  height: 56px;
  border: 1px solid #282828;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #282828;
  transition: all 0.4s ease;
  
  &:hover {
    background: #FF3863;
    border-color: #FF3863;
    color: #FFFEFA;
    transform: translateY(-6px);
  }
`;

const Span = styled.span.attrs({ className: 'contact-Span' })`
  color: #FF3863;
  font-weight: 500;
`;

const Footer = styled.footer.attrs({ className: 'contact-Footer' })`
  display: flex;
  width: 100%;
`;

const Copyright = styled.p.attrs({ className: 'contact-Copyright' })`
  font-size: 16px;
  color: #282828;
  width: 100%;
  white-space: nowrap;
  overflow: visible;
  
  & * {
    display: inline !important;
    white-space: nowrap !important;
  }
  
  @media (max-width: 768px) {
    white-space: normal;
    
    & * {
      white-space: normal !important;
    }
  }
`;

// Moved ExternalLink outside of Copyright - this was the issue!
const ExternalLink = styled.a.attrs({ className: 'contact-ExternalLink' })`
  color: #FF3863;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

// Custom Upwork icon that matches Lucide style
const UpworkIcon = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1">
    <ellipse fill="none" cx="184.5" cy="234.5" rx="57.5" ry="56.5" transform="translate(-546.174 -763.565) scale(4.34783)"/>
    <path d="M345.516 181.708c-42.168 0-65.774 27.481-72.532 55.773-7.658-14.416-13.335-33.698-17.75-51.628H196.94v72.531c0 26.31-11.984 45.772-35.41 45.772-23.427 0-36.852-19.462-36.852-45.772l.27-72.531H91.34v72.531c0 21.174 6.848 40.366 19.372 54.061 12.884 14.146 30.454 21.534 50.817 21.534 40.545 0 68.837-31.085 68.837-75.595V209.64c4.235 16.038 14.326 46.853 33.608 73.884l-18.02 102.625h34.148l11.893-72.712c3.875 3.244 8.02 6.127 12.434 8.74 11.443 7.208 24.508 11.263 38.023 11.713 0 0 2.073.09 3.154.09 41.807 0 75.054-32.346 75.054-76.045 0-43.7-33.337-76.226-75.144-76.226m0 122.358c-25.86 0-42.979-20.003-47.754-27.752 6.127-49.015 24.057-64.512 47.754-64.512 23.426 0 41.626 18.741 41.626 46.132 0 27.39-18.2 46.132-41.626 46.132" fill="none" stroke="currentColor" strokeWidth="14" fillRule="nonzero"/>
  </svg>
);

export const Contact = () => {
  const sectionRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use gsap's y but then clear it after animation so CSS hover works
      gsap.fromTo('.contact-socialLink',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );

      // Animate the title
      gsap.fromTo('.contact-title',
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );

      // Animate the footer
      gsap.fromTo('.contact-footer',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="contact" ref={sectionRef}>
      <Container>
        <Title>Let's connect</Title>
        
        <SocialLinks>
          <SocialLink 
            href="https://github.com/victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-socialLink"
          >
            <Github size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://linkedin.com/in/victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-socialLink"
          >
            <Linkedin size={24} />
          </SocialLink>

          <SocialLink 
            href="https://www.upwork.com/freelancers/~victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-socialLink"
          >
            <UpworkIcon size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://dribbble.com/victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-socialLink"
          >
            <Dribbble size={24} />
          </SocialLink>
          
          <SocialLink 
            href="mailto:victor@victorblanco.com"
            className="contact-socialLink"
          >
            <Mail size={24} />
          </SocialLink>
        </SocialLinks>
        
        <Footer>
          <Copyright>
            © ALL RIGHTS RESERVED - <Heart /> 
            <ExternalLink 
              href="https://www.upwork.com/freelancers/~01141c20a0de332c1a"
              target="_blank"
              rel="noopener noreferrer"
            >
              VICTOR BLANCO {"  "}
            </ExternalLink> 
            2019 - {currentYear}
          </Copyright>
        </Footer>
      </Container>
    </Section>
  );
};