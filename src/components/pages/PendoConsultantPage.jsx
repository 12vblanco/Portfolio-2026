import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ConsentBanner } from '../ConsentBanner.jsx';
import { Contact } from '../Contact';

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
  const heroRef     = useRef(null);
  const servicesRef = useRef(null);
  const faqRef      = useRef(null);
  const ctaRef      = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {

      // Hero fade in
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
      );

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

  return (
    <>
      {/* ── Hero ── */}
      <PageSection ref={heroRef}>
        <PageContainer>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Pendo Consultant</span>
          </Breadcrumb>

          <HeroLabel>Freelance Pendo Consultant</HeroLabel>
          <PageTitle>
            Hire a certified<br />
            <AccentSpan>Pendo expert</AccentSpan>
          </PageTitle>
          <PageSubtitle>
            I'm Victor Blanco — a <strong>freelance Pendo consultant</strong> and certified Pendo Admin
            based in Edinburgh, UK. I help SaaS teams install Pendo correctly, audit broken setups,
            build in-app guides that convert, and create analytics that inform real product decisions.
          </PageSubtitle>

          <HeroCTARow>
            <CTAPrimary
              href="https://calendly.com/12vblanco/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free discovery call
            </CTAPrimary>
            <CTASecondary
              href="https://www.upwork.com/freelancers/~01141c20a0de332c1a"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Upwork profile
            </CTASecondary>
          </HeroCTARow>

          <TrustRow>
            <TrustPill>✓ Pendo Admin certified</TrustPill>
            <TrustPill>✓ Multiple Pendo certifications</TrustPill>
            <TrustPill>✓ B2B SaaS experience</TrustPill>
            <TrustPill>✓ Available worldwide</TrustPill>
          </TrustRow>
        </PageContainer>
      </PageSection>

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

const PageSection = styled.section`
  padding: 6rem 2rem 4rem;
  @media (max-width: 768px) { padding: 5rem 1.25rem 3rem; }
`;

const PageContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
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

const HeroLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FF3863;
  margin-bottom: 1rem;
`;

const PageTitle = styled.h1`
  font-family: 'Switzer', sans-serif;
  font-weight: 700;
  letter-spacing: -2px;
  color: #282828;
  line-height: 1.05;
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    letter-spacing: -1px;
  }
`;

const AccentSpan = styled.span`
  color: #FF3863;
`;

const PageSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.7;
  color: #555;
  max-width: 680px;
  margin: 0 0 2.5rem 0;

  strong { color: #282828; font-weight: 700; }

  @media (max-width: 768px) { font-size: 18px; }
`;

const HeroCTARow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
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
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: #282828;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #282828;

  &:hover {
    background: #282828;
    color: #FFFEFA;
    transform: translateY(-2px);
  }
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TrustPill = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  background: rgba(40, 40, 40, 0.05);
  border: 1px solid #e5e5e5;
  border-radius: 50px;
  padding: 0.3rem 0.9rem;
`;

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
  transition: box-shadow 0.2s ease;

  &:hover { box-shadow: 0 8px 24px rgba(40, 40, 40, 0.08); }
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

const CTASection = styled.section`
  padding: 5rem 2rem;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const CTABox = styled.div`
  background: #282828;
  border-radius: 16px;
  padding: 3.5rem;
  text-align: center;

  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTATitle = styled.h2`
  font-family: 'Switzer', sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
  color: #FFFEFA;
  margin: 0 0 1rem 0;
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