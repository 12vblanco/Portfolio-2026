import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const BaseLogoStyles = styled.div`
  font-family: 'Switzer', sans-serif;
  margin-top: 3px;
  margin-left: 1rem;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -2%;
  color: #282828;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: #ff3863;
    border-radius: 250px;
  }
`;

const NonClickableLogo = styled(BaseLogoStyles)`
  cursor: default;
`;

const StyledLink = styled(Link)`
  font-family: 'Switzer', sans-serif;
  margin-top: 3px;
  margin-left: 1rem;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -2%;
  color: #282828;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: #ff3863;
    border-radius: 250px;
  }
`;