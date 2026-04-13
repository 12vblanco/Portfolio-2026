import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Banner = styled.div.attrs({ className: 'consentBanner-Banner' })`
  position: fixed;
  bottom: 24px;
  right: 24px;
  left: 24px;
  max-width: 500px;
  margin-left: auto;
  background: #282828;
  color: #FFFEFA;
  padding: 32px 24px;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(40, 40, 40, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  z-index: 9999;
  transform: translateY(${props => props.$visible ? '0' : '100px'});
  opacity: ${props => props.$visible ? '1' : '0'};
  transition: all 0.5s ease;
  
  @media (max-width: 640px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
    flex-direction: column;
    text-align: center;
  }
`;

const Text = styled.p.attrs({ className: 'consentBanner-Text' })`
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const Button = styled.button.attrs({ className: 'consentBanner-Button' })`
  padding: 10px 24px;
  background: #FFFEFA;
  color: #282828;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const TermsLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover { color: #FFFEFA; }
`;

export const ConsentBanner = ({ onOpenTerms }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem('cookiesAccepted');
      if (!accepted) {
        setVisible(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  return (
    <Banner $visible={visible}>
      <Text>
        We use cookies & <strong>Pendo</strong> to monitor traffic anonymously, improve experience, and understand usage. <TermsLink onClick={onOpenTerms}>Terms & Conditions</TermsLink>
      </Text>
      <Button onClick={handleAccept}>I understand</Button>
    </Banner>
  );
};
