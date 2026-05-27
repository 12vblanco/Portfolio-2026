import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const DesktopNav = ({ navItems, onHashClick }) => (
  <NavLinks>
    {navItems.map((item, idx) =>
      item.type === 'route' ? (
        <StyledNavLink key={idx} to={item.target}>
          {item.label}
        </StyledNavLink>
      ) : (
        <NavLink key={idx} href={item.target} onClick={(e) => onHashClick(e, item.target)}>
          {item.label}
        </NavLink>
      )
    )}
  </NavLinks>
);

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 3px;
  align-items: center;
  @media (max-width: 968px) {
    display: none;
  }
`;

const sharedNavLinkStyles = css`
  font-size: 20px;
  color: #282828;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  margin-top: 2px;
  &:hover { color: #ff3863; }
`;

const NavLink = styled.a`${sharedNavLinkStyles}`;
const StyledNavLink = styled(Link)`${sharedNavLinkStyles}`;