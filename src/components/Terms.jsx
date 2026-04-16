import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// ─── Component ────────────────────────────────────────────────────────────────

export const Terms = ({ open, onClose }) => {
  const panelRef = useRef(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // Scroll into view when opened
  useEffect(() => {
    if (open && panelRef.current) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150); // increased from 50ms — mobile needs more time after paint
    }
  }, [open]);

  if (!open) return null;

  return (
    <Section id="terms" ref={panelRef}>
      <Container>

        <PanelHeader>
          <div>
            <PanelTitle>Terms &amp; Conditions</PanelTitle>
            <PanelMeta>victorblancoweb.com · Last updated: {dateStr}</PanelMeta>
          </div>
          <CloseButton onClick={onClose} aria-label="Close terms and conditions">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </CloseButton>
        </PanelHeader>

        <Divider />

        <TermsSection>
          <SectionTitle>1. Introduction</SectionTitle>
          <Body>
            Welcome to victorblancoweb.com ("the Website"), the professional portfolio and
            services website of Victor Blanco — freelance Web Developer, Designer, and Pendo
            Consultant ("I", "me", or "my"). By using this Website, you agree to these Terms
            and Conditions.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>2. About This Website</SectionTitle>
          <Body>
            This Website is operated by Victor Blanco, an independent freelance professional
            based in Edinburgh, Scotland, UK. It serves as a professional portfolio and point
            of contact for potential and existing clients worldwide. Services are agreed and
            contracted separately between Victor Blanco and individual clients.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>3. Data Collection &amp; Privacy</SectionTitle>
          <Highlight>
            This Website does not collect, store, or process any personal data through forms,
            databases, or tracking systems operated by Victor Blanco.
          </Highlight>
          <Body>
            <strong>Pendo analytics</strong> is used solely for anonymous traffic monitoring.
            No personally identifiable information is collected — data is used only to
            understand general usage patterns and improve the Website experience. Pendo's own
            privacy policy governs how that data is handled on their end.
          </Body>
          <Body>
            Any communication you initiate via email or third-party platforms is subject to
            those platforms' own privacy policies. Contact information you share is used only
            to respond to your enquiry and manage any resulting engagement.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>4. Intellectual Property</SectionTitle>
          <Body>
            All content on this Website — including text, design, graphics, code, case
            studies, and project descriptions — is the intellectual property of Victor Blanco
            unless otherwise stated. All rights reserved.
          </Body>
          <Body>
            Third-party logos and trademarks (e.g. Pendo, Edinburgh Napier University,
            N-able) remain the property of their respective owners and are used for
            identification purposes only.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>5. Acceptable Use</SectionTitle>
          <Body>You agree not to:</Body>
          <List>
            <li>Transmit unsolicited advertising or promotional material</li>
            <li>Attempt unauthorised access to any part of the Website or its systems</li>
            <li>Use automated tools to scrape or extract data without prior written consent</li>
            <li>Engage in any unlawful, harmful, or abusive conduct</li>
          </List>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>6. Disclaimer &amp; Limitation of Liability</SectionTitle>
          <Body>
            This Website and its content are provided on an "as is" basis. While every
            reasonable effort is made to keep information accurate, no warranty is given that
            the Website will be uninterrupted or error-free. Nothing on this Website
            constitutes legal, financial, or professional advice.
          </Body>
          <Body>
            To the fullest extent permitted by law, Victor Blanco shall not be liable for any
            direct, indirect, incidental, or consequential damages arising from your use of
            this Website.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>7. Third-Party Links</SectionTitle>
          <Body>
            This Website may link to third-party sites (e.g. Upwork, LinkedIn, GitHub).
            These are provided for convenience only. Victor Blanco has no control over and
            accepts no responsibility for their content or practices.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>8. Professional Services</SectionTitle>
          <Body>
            Any freelance or consulting services are governed by separate agreements with
            each client. Enquiries made via the contact details on this Website do not
            constitute a binding agreement. A formal engagement begins only once both parties
            have agreed to specific terms in writing.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>9. Governing Law</SectionTitle>
          <Body>
            These Terms are governed by the laws of England and Wales. If you access this
            Website from outside the UK, you are responsible for compliance with your
            local laws.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>10. Changes to These Terms</SectionTitle>
          <Body>
            Victor Blanco reserves the right to update these Terms at any time. Changes take
            effect immediately upon publication. Continued use of the Website constitutes
            acceptance of the updated terms.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>11. Contact</SectionTitle>
          <ContactBlock>
            <p><strong>Website:</strong> victorblancoweb.com</p>
            <p><strong>Email:</strong> info@victorblancoweb.com</p>
            <p><strong>Upwork:</strong> Available via the Upwork platform profile</p>
            <p><strong>Location:</strong> Edinburgh, Scotland, United Kingdom</p>
          </ContactBlock>
        </TermsSection>

        <PanelFooter>
          © Victor Blanco {today.getFullYear()} · All rights reserved
        </PanelFooter>

      </Container>
    </Section>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const expandDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  width: 100%;
  background: transparent;
  border-top: 1px solid #e5e5e5;
  animation: ${expandDown} 0.35s ease forwards;
  scroll-margin-top: 2rem;
  will-change: transform, opacity;
  /* Ensure the element is never hidden by a stacking/overflow ancestor */
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;

  @media (max-width: 640px) {
    padding: 2rem 1.25rem 3rem;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PanelTitle = styled.h2`
  font-family: 'Switzer', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -1px !important;
  color: #282828 !important;
  margin: 0 !important;
  line-height: 1.2 !important;

  @media (max-width: 480px) {
    font-size: 25px !important;
  }
`;

const PanelMeta = styled.p`
  font-size: 16px !important;
  margin: 0.3rem 0 0 0 !important;
  line-height: 1.4 !important;
`;

const CloseButton = styled.button`
  background: none;
  border: 1.5px solid #282828;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  min-width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #282828;
  transition: all 0.2s ease;

  svg {
    width: 36px;
    height: 36px;
  }

  &:hover {
    background: #FF3863;
    border-color: #FF3863;
    color: #FFFEFA;
  }

  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: 2px;
  }
`;

const Divider = styled.hr`
  border: none;
  margin: 1.2rem 0;
`;

const TermsSection = styled.div``;

const SectionTitle = styled.h5`
  margin: 0 0 0.6rem 0 !important;
`;

const Body = styled.p`
  margin: 0 0 0.75rem 0 !important;

  strong {
    color: #282828;
    font-weight: 800;
  }
`;

const Highlight = styled.div`
  background: rgba(255, 56, 99, 0.05);
  border-left: 3px solid #FF3863;
  border-radius: 0 2px 2px 0;
  padding: 0.75rem 1rem;
  margin-bottom: 0.9rem;
  font-size: 16px;
  line-height: 1.7;
  color: #555;
`;

const List = styled.ul`
  margin: 0.5rem 0 0.75rem 1.25rem;
  padding: 0;

  li {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 0.3rem;
  }
`;

const ContactBlock = styled.div`
  background: rgba(40, 40, 40, 0.04);
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 1rem 1.25rem;

  p {
    line-height: 1.7 !important;
    color: #555;
    margin: 0.2rem 0 !important;

    strong {
      color: #282828;
      font-weight: 600;
    }
  }
`;

const PanelFooter = styled.p`
  margin-top: 2.5rem !important;
  text-align: center;
`;