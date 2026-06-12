import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { trackEvent } from '../../utils/analytics';

const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 199px;
  padding: 10px 16px 8px;
  border-radius: 50px;
  font-family: 'Switzer', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const primaryStyles = css`
  ${baseStyles}
  background: #ff3863;
  color: #fffefa;
  border-color: #ff3863;

  &:hover {
    background: #e02d56;
    border-color: #e02d56;
    transform: translateY(-1px);
  }

  @media (max-width: 468px) {
    margin-bottom: 1rem;
  }
`;

const secondaryStyles = css`
  ${baseStyles}
  background: transparent;
  color: #fffefa;
  border-color: rgba(255, 254, 250, 0.5);

  &:hover {
    background: #fffefa;
    color: #282828;
    border-color: #fffefa;
    transform: translateY(-1px);
  }
`;

const PrimaryA = styled.a`${primaryStyles}`;
const PrimaryLink = styled(Link)`${primaryStyles}`;
const SecondaryA = styled.a`${secondaryStyles}`;
const SecondaryLink = styled(Link)`${secondaryStyles}`;

export const CTAButton = ({ variant = 'primary', href, to, children, onClick, ...rest }) => {
  const handleClick = (e) => {
    trackEvent('cta_click', {
      cta_text: typeof children === 'string' ? children : undefined,
      cta_url: href || to,
    });
    onClick?.(e);
  };

  if (variant === 'primary') {
    return to
      ? <PrimaryLink to={to} onClick={handleClick} {...rest}>{children}</PrimaryLink>
      : <PrimaryA href={href} onClick={handleClick} {...rest}>{children}</PrimaryA>;
  }
  return to
    ? <SecondaryLink to={to} onClick={handleClick} {...rest}>{children}</SecondaryLink>
    : <SecondaryA href={href} onClick={handleClick} {...rest}>{children}</SecondaryA>;
};