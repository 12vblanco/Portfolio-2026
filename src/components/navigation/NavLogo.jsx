import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const NavLogo = ({ isHomePage, variant = 'desktop' }) => {
  const style = variant === 'mobile'
    ? { fontSize: '48px', letterSpacing: '-2px', lineHeight: '1.1' }
    : {};

  const content = (
    <>
      Victor Blanco<span>.</span>
    </>
  );

  if (isHomePage) {
    return <NonClickableLogo style={style}>{content}</NonClickableLogo>;
  }
  return <StyledLink to="/" style={style}>{content}</StyledLink>;
};

const sharedLogoStyles = css`
  font-family: 'Switzer', sans-serif;
  margin-top: 3px;
  margin-left: 1rem;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #282828;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #ff3863;
    border-radius: 250px;
  }

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;

const NonClickableLogo = styled.div`
  ${sharedLogoStyles}
  cursor: default;
`;

const StyledLink = styled(Link)`
  ${sharedLogoStyles}
  text-decoration: none;
`;