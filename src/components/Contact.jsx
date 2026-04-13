import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dribbble, Github, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart } from '../assets/icons/Heart';

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

// ─── Icons ────────────────────────────────────────────────────────────────────

const UpworkIcon = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1">
    <ellipse fill="none" cx="184.5" cy="234.5" rx="57.5" ry="56.5" transform="translate(-546.174 -763.565) scale(4.34783)" />
    <path d="M345.516 181.708c-42.168 0-65.774 27.481-72.532 55.773-7.658-14.416-13.335-33.698-17.75-51.628H196.94v72.531c0 26.31-11.984 45.772-35.41 45.772-23.427 0-36.852-19.462-36.852-45.772l.27-72.531H91.34v72.531c0 21.174 6.848 40.366 19.372 54.061 12.884 14.146 30.454 21.534 50.817 21.534 40.545 0 68.837-31.085 68.837-75.595V209.64c4.235 16.038 14.326 46.853 33.608 73.884l-18.02 102.625h34.148l11.893-72.712c3.875 3.244 8.02 6.127 12.434 8.74 11.443 7.208 24.508 11.263 38.023 11.713 0 0 2.073.09 3.154.09 41.807 0 75.054-32.346 75.054-76.045 0-43.7-33.337-76.226-75.144-76.226m0 122.358c-25.86 0-42.979-20.003-47.754-27.752 6.127-49.015 24.057-64.512 47.754-64.512 23.426 0 41.626 18.741 41.626 46.132 0 27.39-18.2 46.132-41.626 46.132" fill="none" stroke="currentColor" strokeWidth="14" fillRule="nonzero" />
  </svg>
);

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