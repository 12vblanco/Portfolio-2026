import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dribbble, Github, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart } from '../assets/icons/Heart';
import { UpworkIcon } from '../assets/icons/Upwork';

gsap.registerPlugin(ScrollTrigger);

// ─── Component ────────────────────────────────────────────────────────────────

export const Contact = ({ onOpenTerms }) => {
  const sectionRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const socialLinks = document.querySelectorAll('.contact-SocialLink');
        if (socialLinks.length) {
          gsap.fromTo(socialLinks,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
              ease: 'power2.out', clearProps: 'transform',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
            }
          );
        }

        const title = document.querySelector('.contact-Title');
        if (title) {
          gsap.fromTo(title,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8,
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
          );
        }

        const footer = document.querySelector('.contact-Footer');
        if (footer) {
          gsap.fromTo(footer,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.3,
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
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
          <SocialLink href="https://github.com/12vblanco" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <Github size={24} aria-hidden="true" />
          </SocialLink>

          <SocialLink href="https://www.upwork.com/freelancers/~01141c20a0de332c1a" target="_blank" rel="noopener noreferrer" aria-label="Upwork profile">
            <UpworkIcon />
          </SocialLink>

          <SocialLink href="https://dribbble.com/Victor-Blanco" target="_blank" rel="noopener noreferrer" aria-label="Dribbble profile">
            <Dribbble size={24} aria-hidden="true" />
          </SocialLink>

          <SocialLink href="mailto:info@victorblancoweb.com" aria-label="Email Victor">
            <Mail size={24} aria-hidden="true" />
          </SocialLink>
        </SocialLinks>

        <Footer>
          {/* Line 1: ALL RIGHTS RESERVED · Terms & Conditions */}
          <FooterRow>
            <span>ALL RIGHTS RESERVED</span>
            <Separator>·</Separator>
            <TermsTrigger onClick={onOpenTerms}>
              TERMS &amp; CONDITIONS
            </TermsTrigger>
          </FooterRow>

          {/* Line 2: Heart · VICTOR BLANCO · years */}
          <FooterRow>
            <Heart />
            <ExternalLink
              href="https://www.upwork.com/freelancers/~01141c20a0de332c1a"
              target="_blank"
              rel="noopener noreferrer"
            >
              VICTOR BLANCO
            </ExternalLink>
            <span>2019 - {currentYear}</span>
          </FooterRow>
        </Footer>
      </Container>
    </Section>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled.section.attrs({ className: 'contact-Section' })`
  min-height: 28vh;
`;

const Container = styled.div.attrs({ className: 'contact-Container' })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem 2rem;
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
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 16px;
  color: #282828;
`;

const Separator = styled.span`
  color: #ccc;
`;

const TermsTrigger = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: 'Switzer', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #FF3863;
  transition: opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: 3px;
    border-radius: 2px;
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