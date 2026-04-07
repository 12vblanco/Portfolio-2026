import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dribbble, Github, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart } from '../assets/icons/Heart';
import { UpworkIcon } from '../assets/icons/Upwork';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section.attrs({ className: 'contact-Section' })`
  max-height: 32vh;
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
  
  & .copyright-line1 {
    display: inline;
  }
  
  & .copyright-line2 {
    display: inline;
  }
`;

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



export const Contact = () => {
  const sectionRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate social links
        const socialLinks = document.querySelectorAll('.contact-SocialLink');
        if (socialLinks.length) {
          gsap.fromTo(socialLinks,
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
        }

        // Animate the title
        const title = document.querySelector('.contact-Title');
        if (title) {
          gsap.fromTo(title,
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
        }

        // Animate the footer
        const footer = document.querySelector('.contact-Footer');
        if (footer) {
          gsap.fromTo(footer,
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
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timer);
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
            aria-label="GitHub profile"
          >
            <Github size={24} aria-hidden="true" />
          </SocialLink>

          <SocialLink 
            href="https://www.upwork.com/freelancers/~victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Upwork profile"
          >
            <UpworkIcon size={24} aria-hidden="true" />
          </SocialLink>
          
          <SocialLink 
            href="https://dribbble.com/victorblanco" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Dribbble profile"
          >
            <Dribbble size={24} aria-hidden="true" />
          </SocialLink>
          
          <SocialLink 
            href="mailto:victor@victorblanco.com"
            aria-label="Email Victor"
          >
            <Mail size={24} aria-hidden="true" />
          </SocialLink>
        </SocialLinks>
        
        <Footer>
          <Copyright>
            <span className="copyright-line1">ALL RIGHTS RESERVED</span>
            <span className="copyright-line2">
              <Heart />
              <ExternalLink 
                href="https://www.upwork.com/freelancers/~01141c20a0de332c1a"
                target="_blank"
                rel="noopener noreferrer"
              >
                VICTOR BLANCO
              </ExternalLink> 
              2019 - {currentYear}
            </span>
          </Copyright>
        </Footer>
      </Container>
    </Section>
  );
};