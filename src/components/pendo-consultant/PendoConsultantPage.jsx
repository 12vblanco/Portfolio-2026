import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePageTitle } from '../../hooks/usePageTitle.js';
import { ConsentBanner } from '../ConsentBanner.jsx';
import { Contact } from '../Contact.jsx';
import { HeroCTA } from '../common/HeroCTA.jsx';
import { HeroTitle } from '../common/HeroTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    number: '01',
    title: 'Installation & Setup',
    text: 'Full Pendo installation for SaaS products — snippet deployment, data layer configuration, and account structure set up correctly from day one so everything downstream is reliable.',
    keywords: 'pendo setup saas, pendo installation guide, pendo getting started',
  },
  {
    number: '02',
    title: 'Audit & Gap Analysis',
    text: 'Comprehensive audit of your existing Pendo installation. I identify tracking gaps, redundant or broken tags, misconfigured funnels, and deliver a prioritised action list to get your data trustworthy again.',
    keywords: 'pendo audit, pendo installation audit, pendo tracking gaps',
  },
  {
    number: '03',
    title: 'In-App Guides & Onboarding Flows',
    text: 'Fully customised tooltips, walkthroughs, announcements, and multi-step onboarding flows built to match your brand and move users toward key activation actions. Designed to reduce churn and improve feature adoption.',
    keywords: 'pendo in-app guides, pendo onboarding flow, pendo tooltip design',
  },
  {
    number: '04',
    title: 'Analytics, Dashboards & Reporting',
    text: 'Dashboards, funnels, NPS reports, and retention analytics that surface what actually matters. I build reporting structures your team can actually use — not just admire.',
    keywords: 'pendo analytics reporting, pendo dashboards, pendo funnel reports',
  },
];

const faqs = [
  {
    q: 'What does a freelance Pendo consultant do?',
    a: 'A freelance Pendo consultant helps SaaS companies install, configure, and get maximum value from Pendo. This includes initial setup, auditing broken or incomplete installations, building in-app guides and onboarding flows, and creating analytics dashboards and reports that inform product decisions.',
  },
  {
    q: 'How is hiring a freelance Pendo expert different from using Pendo\'s own support?',
    a: 'Pendo\'s support covers technical issues with the platform itself. A freelance consultant goes further — implementing Pendo to fit your specific product, users, and goals. I work directly in your account, build your guides and analytics, and ensure your setup reflects best practice rather than default configuration.',
  },
  {
    q: 'Do I need a Pendo consultant if we\'re already using Pendo?',
    a: 'Often yes. Many teams install Pendo but never fully configure it — resulting in missing data, underused features, and guides that don\'t convert. An audit frequently uncovers significant gaps that, once fixed, unlock the value you\'re already paying for.',
  },
  {
    q: 'Are you Pendo certified?',
    a: 'Yes — I hold multiple Pendo certifications including Pendo Admin. I\'ve worked with Pendo professionally across B2B SaaS products, in-house at N-able Inc., and as a freelance consultant for clients worldwide.',
  },
  {
    q: 'What does a Pendo audit involve?',
    a: 'A Pendo audit covers: installation health (snippet, data layer, feature tagging), tracking coverage gaps, guide performance review, funnel and analytics accuracy, NPS configuration, and a prioritised list of recommended fixes. Delivered as a written report with clear next steps.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free 30-minute discovery call via Calendly or reach out via email or Upwork. We\'ll discuss your current setup, what\'s not working, and what you need. From there I\'ll scope the work and provide a clear proposal.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export const PendoConsultantPage = ({ onOpenTerms }) => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);
  const servicesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero fade in animation
      gsap.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.01 }
      );

      // Animate the title lines
      gsap.to(line1Ref.current, {
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });
      
      gsap.to(line2Ref.current, {
        y: 0,
        duration: 0.6,
        delay: 0.35,
        ease: 'power3.out',
      });

      // Services stagger
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            servicesRef.current.querySelectorAll('[data-service]'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
          );
        },
      });

      // FAQ stagger
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            faqRef.current.querySelectorAll('[data-faq]'),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
          );
        },
      });

      // CTA
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
        },
      });

    });

    return () => ctx.revert();
  }, []);

  usePageTitle(
    'Pendo Consultant | Installation, Audit, Guides & Analytics | Victor Blanco',
    'Certified Pendo consultant expert on installation, audit, creating custom guides, and analytics reporting. Based in Edinburgh, working with B2B SaaS teams globally.'
  );

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection ref={heroRef}>
        <HeroContainer>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Pendo Consultant</span>
          </Breadcrumb>

          <HeroTitle
            line1Ref={line1Ref}
            line2Ref={line2Ref}
            star1Ref={star1Ref}
            star2Ref={star2Ref}
            star3Ref={star3Ref}
            line1Text="Freelance Pendo"
            line2Text="Consultant"
          />



          <ContentWrapper>
            <LeftColumn>
              <Subtitle>
                I'm a <strong>certified Pendo consultant </strong>
                based in Edinburgh, UK. I help teams install Pendo, audit setups, and 
                design and implement roadmaps to create analytics that inform product decisions.
              </Subtitle>
            </LeftColumn>
            <RightColumn>
            <HeroCTA 
              primaryButtonText="View Services"
              primaryButtonLink="#services"
              secondaryButtonText="Book a Call"
            />          
           </RightColumn>
          </ContentWrapper>
        </HeroContainer>
      </HeroSection>

      {/* ── Services ── */}
      <ServicesSection ref={servicesRef}>
        <PageContainer>
          <SectionLabel>What I do</SectionLabel>
          <SectionTitle>Pendo consulting services</SectionTitle>
          <SectionSubtitle>
            Whether you need a full Pendo setup for a new SaaS product, an audit of an existing
            installation, or ongoing consulting — I cover the full stack of Pendo services.
          </SectionSubtitle>

          <ServiceGrid>
            {services.map((service, i) => (
              <ServiceCard key={i} data-service>
                <ServiceNumber>{service.number}</ServiceNumber>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceText>{service.text}</ServiceText>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </PageContainer>
      </ServicesSection>

      {/* ── Why hire a freelance Pendo consultant ── */}
      <WhySection>
        <PageContainer>
          <SectionLabel>Why freelance</SectionLabel>
          <SectionTitle>Why hire a freelance Pendo consultant?</SectionTitle>

          <WhyGrid>
            <WhyCard>
              <WhyTitle>Specialist expertise</WhyTitle>
              <WhyText>
                Pendo is a complex platform. A dedicated Pendo consultant brings depth of knowledge
                that a generalist developer or in-house team rarely has time to build. I've worked
                in Pendo full-time — I know where the edge cases are.
              </WhyText>
            </WhyCard>
            <WhyCard>
              <WhyTitle>No long-term commitment</WhyTitle>
              <WhyText>
                Hiring freelance means you get expert Pendo help scoped to exactly what you need —
                a one-off audit, a setup project, or an ongoing retainer. No agency overhead,
                no minimum contracts.
              </WhyText>
            </WhyCard>
            <WhyCard>
              <WhyTitle>Faster results</WhyTitle>
              <WhyText>
                As a freelance Pendo expert I work directly in your account with no handoff delays.
                Most audits are delivered within a week. Most setup projects within two.
              </WhyText>
            </WhyCard>
            <WhyCard>
              <WhyTitle>Certified & proven</WhyTitle>
              <WhyText>
                Multiple Pendo certifications including Pendo Admin. Previous in-house experience
                at N-able Inc. and freelance clients across SaaS, healthcare, and e-commerce.
              </WhyText>
            </WhyCard>
          </WhyGrid>
        </PageContainer>
      </WhySection>

      {/* ── FAQ ── */}
      <FAQSection ref={faqRef}>
        <PageContainer>
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle>Common questions about hiring a Pendo consultant</SectionTitle>

          <FAQList>
            {faqs.map((faq, i) => (
              <FAQItem key={i} data-faq>
                <FAQQuestion>{faq.q}</FAQQuestion>
                <FAQAnswer>{faq.a}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </PageContainer>
      </FAQSection>

      {/* ── CTA ── */}
      <CTASection ref={ctaRef}>
        <PageContainer>
          <CTABox>
            <CTATitle>Ready to get more from Pendo?</CTATitle>
            <CTASubtitle>
              Book a free 30-minute discovery call and let's talk about your setup,
              your goals, and how I can help.
            </CTASubtitle>
            <CTAButtonRow>
              <CTAPrimary
                href="https://calendly.com/12vblanco/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a free call
              </CTAPrimary>
              <CTASecondary
                href="mailto:info@victorblancoweb.com"
              >
                Email me directly
              </CTASecondary>
            </CTAButtonRow>
          </CTABox>
        </PageContainer>
      </CTASection>

      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

// Hero Section
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 80px 32px;
  margin-top: -4rem;

  @media (max-width: 968px) {
    margin-top: -2rem;
    min-height: 84vh !important;
    padding: 1rem;
  }
`;

const HeroContainer = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;

  @media (max-width: 968px) {
    padding: 4rem 1rem 0 1rem;
    width: fit-content;
  }
  @media (max-width: 426px) {
    width: 100%;
  }
`;

const Breadcrumb = styled.nav`
  font-size: 15px;
  color: #888;
  margin-bottom: 2rem;

  a {
    color: #888;
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: #FF3863; }
  }

  span { color: #282828; }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.5rem;

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

  @media (max-width: 968px) {
    align-items: flex-start;
    width: 100%;
  }
  @media (max-width: 432px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #282828;
  max-width: 540px;
  margin-bottom: 0;

  strong {
    font-weight: 700;
    color: #282828;
  }

  @media (max-width: 968px) {
    font-size: 18px;
  }
`;

// Shared Components
const PageContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

// Services Section
const ServicesSection = styled.section`
  padding: 5rem 2rem;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const SectionLabel = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FF3863;
  margin-bottom: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Switzer', sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
  color: #282828;
  margin: 0 0 0.75rem 0;
  line-height: 1.15;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 600px;
  margin: 0 0 3rem 0;
  line-height: 1.7;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ServiceCard = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  opacity: 0;

  &:hover { 
    box-shadow: 0 8px 24px rgba(40, 40, 40, 0.08);
    transform: translateY(-4px);
  }
`;

const ServiceNumber = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
`;

const ServiceTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 0.6rem 0;
`;

const ServiceText = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

// Why Section
const WhySection = styled.section`
  padding: 5rem 2rem;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const WhyCard = styled.div`
  padding: 1.75rem;
  border-left: 3px solid #FF3863;
  background: rgba(255, 56, 99, 0.02);
  border-radius: 0 8px 8px 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const WhyTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 0.5rem 0;
`;

const WhyText = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 5rem 2rem;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const FAQItem = styled.div`
  padding: 1.5rem 1.75rem;
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  transition: box-shadow 0.2s ease;
  opacity: 0;

  &:hover {
    box-shadow: 0 4px 12px rgba(40, 40, 40, 0.06);
  }
`;

const FAQQuestion = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 0.6rem 0;
`;

const FAQAnswer = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

// CTA Section
const CTASection = styled.section`
  padding: 5rem 2rem;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const CTABox = styled.div`
  background: #282828;
  border-radius: 16px;
  padding: 3.5rem;
  text-align: center;
  opacity: 0;

  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTATitle = styled.h2`
  font-family: 'Switzer', sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
  color: #FFFEFA;
  margin: 0 0 1rem 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
`;

const CTASubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 254, 250, 0.7);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const CTAButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.85rem 1.75rem;
  background: #FF3863;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #FF3863;

  &:hover {
    background: #e02d56;
    border-color: #e02d56;
    transform: translateY(-2px);
  }
`;

const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #FFFEFA;

  &:hover {
    background: #FFFEFA;
    color: #282828;
    transform: translateY(-2px);
  }
`;