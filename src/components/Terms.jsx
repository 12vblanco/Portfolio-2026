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
      }, 150);
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
            This Website does not collect, store, or process any personally identifiable
            information through forms, databases, or tracking systems directly operated by
            Victor Blanco. No names, email addresses, or contact details are collected
            automatically by this Website.
          </Highlight>
          <Body>
            However, this Website uses third-party analytics and tracking tools that may
            collect anonymous or pseudonymous data about your visit. Full details are
            provided in Section 4 below.
          </Body>
          <Body>
            Any communication you initiate via email or third-party platforms (e.g. Upwork,
            LinkedIn) is subject to those platforms' own privacy policies. Contact information
            you share voluntarily is used only to respond to your enquiry and manage any
            resulting engagement.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>4. Analytics &amp; Tracking Tools</SectionTitle>
          <Body>
            This Website uses the following third-party tools for anonymous traffic monitoring
            and usage analysis. No personally identifiable information is knowingly collected
            through these tools. Data collected is used solely to understand general usage
            patterns and improve the Website experience.
          </Body>

          <SubSectionTitle>4.1 Pendo Analytics</SubSectionTitle>
          <Body>
            This Website uses <strong>Pendo</strong>, a product analytics platform operated
            by Pendo.io, Inc. (USA). Pendo collects anonymous behavioural data including page
            views, session duration, and feature interactions. Visitors are assigned a
            randomly generated anonymous identifier stored in your browser's local storage —
            no name, email, or personally identifiable information is associated with this ID.
          </Body>
          <Body>
            Pendo may transfer data to servers located in the United States. Such transfers
            are governed by Pendo's own data processing agreements and privacy policy. For
            more information, visit{' '}
            <ExternalLink href="https://www.pendo.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
              pendo.io/legal/privacy-policy
            </ExternalLink>.
          </Body>

          <SubSectionTitle>4.2 Ahrefs Analytics</SubSectionTitle>
          <Body>
            This Website uses <strong>Ahrefs Analytics</strong>, a web analytics service
            operated by Ahrefs Pte. Ltd. (Singapore). Ahrefs Analytics collects anonymous
            traffic data including page views, referral sources, and general geographic
            region. It is designed to be privacy-friendly and does not use cookies or collect
            personally identifiable information.
          </Body>
          <Body>
            For more information, visit{' '}
            <ExternalLink href="https://ahrefs.com/privacy" target="_blank" rel="noopener noreferrer">
              ahrefs.com/privacy
            </ExternalLink>.
          </Body>

          <SubSectionTitle>4.3 Legal Basis for Processing (UK &amp; EU GDPR)</SubSectionTitle>
          <Body>
            Where UK GDPR or EU GDPR applies, the legal basis for using these analytics tools
            is <strong>legitimate interests</strong> (Article 6(1)(f)) — specifically, the
            interest in understanding how visitors use the Website in order to improve its
            content and performance. No sensitive personal data is processed. You may object
            to this processing at any time by contacting info@victorblancoweb.com.
          </Body>

          <SubSectionTitle>4.4 California Residents (CCPA)</SubSectionTitle>
          <Body>
            If you are a California resident, you have rights under the California Consumer
            Privacy Act (CCPA) including the right to know what data is collected about you
            and the right to opt out of the sale of personal information. This Website does
            not sell personal information. As only anonymous data is collected via third-party
            tools, no personally identifiable information about California residents is held
            by Victor Blanco. For enquiries, contact info@victorblancoweb.com.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>5. Cookies &amp; Local Storage</SectionTitle>
          <Body>
            This Website does not use cookies directly. However, Pendo Analytics uses
            your browser's <strong>local storage</strong> to store a randomly generated
            anonymous visitor ID. This is used solely to distinguish unique visits and is not
            linked to any personal information. It persists across sessions until your browser
            data is cleared.
          </Body>
          <Body>
            You can clear this data at any time through your browser settings under
            "Site Data" or "Local Storage" for victorblancoweb.com.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>6. Intellectual Property</SectionTitle>
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
          <SectionTitle>7. Acceptable Use</SectionTitle>
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
          <SectionTitle>8. Disclaimer &amp; Limitation of Liability</SectionTitle>
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
          <SectionTitle>9. Third-Party Links</SectionTitle>
          <Body>
            This Website may link to third-party sites (e.g. Upwork, LinkedIn, GitHub).
            These are provided for convenience only. Victor Blanco has no control over and
            accepts no responsibility for their content or practices.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>10. Professional Services</SectionTitle>
          <Body>
            Any freelance or consulting services are governed by separate agreements with
            each client. Enquiries made via the contact details on this Website do not
            constitute a binding agreement. A formal engagement begins only once both parties
            have agreed to specific terms in writing.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>11. Governing Law</SectionTitle>
          <Body>
            These Terms are governed by the laws of England and Wales. If you access this
            Website from outside the UK, you are responsible for compliance with your
            local laws.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>12. Changes to These Terms</SectionTitle>
          <Body>
            Victor Blanco reserves the right to update these Terms at any time. Changes take
            effect immediately upon publication. Continued use of the Website constitutes
            acceptance of the updated terms.
          </Body>
        </TermsSection>

        <Divider />

        <TermsSection>
          <SectionTitle>13. Contact &amp; Data Requests</SectionTitle>
          <Body>
            For any privacy-related enquiries, data subject requests (access, erasure,
            objection), or general questions about these Terms, please contact:
          </Body>
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

const SubSectionTitle = styled.h6`
  margin: 1rem 0 0.4rem 0 !important;
  font-weight: 600 !important;
  color: #282828 !important;
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

const ExternalLink = styled.a`
  color: #FF3863;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const PanelFooter = styled.p`
  margin-top: 2.5rem !important;
  text-align: center;
`;