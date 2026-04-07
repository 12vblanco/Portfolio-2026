import styled from 'styled-components';

const StarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF3863">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ReviewCard = ({ review, isCenter }) => (
  <Card $isCenter={isCenter}>
    <StarsRow>
      {Array.from({ length: review.rating }).map((_, i) => (
        <StarIcon key={i} size={18} />
      ))}
    </StarsRow>
    <ReviewText $isCenter={isCenter}>"{review.text}"</ReviewText>
    <ClientRow>
      <ClientInfo>
        <ClientName $isCenter={isCenter}>{review.name}</ClientName>
      </ClientInfo>
      <ClientMeta $isCenter={isCenter}>{review.company}</ClientMeta>
    </ClientRow>
  </Card>
);

export default ReviewCard;

// ─── Styled Components ────────────────────────────────────────────────────────

const Card = styled.div.attrs({ className: 'reviewCard-Card' })`
  background: ${p => p.$isCenter ? '#FFFEFA' : 'rgba(255,255,255,0.06)'};
  border-radius: 24px;
  padding: 28px 32px;
  box-shadow: ${p => p.$isCenter
    ? '0 24px 48px rgba(0,0,0,0.3)'
    : '0 8px 24px rgba(0,0,0,0.15)'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: ${p => p.$isCenter ? '1px solid #e5e5e5' : '1px solid rgba(255,255,255,0.08)'};
  @media (max-width: 426px) {
    min-height: 396px;
  }
`;

const ReviewText = styled.p.attrs({ className: 'reviewCard-ReviewText' })`
  font-size: 20px;
  font-weight: 500;
  color: ${p => p.$isCenter ? '#282828' : 'rgba(255,255,255,0.4)'};
  line-height: 1.8;
  margin: 16px 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-style: italic;

  @media (max-width: 968px) { font-size: 18px; }
`;

const StarsRow = styled.div.attrs({ className: 'reviewCard-StarsRow' })`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ClientRow = styled.div.attrs({ className: 'reviewCard-ClientRow' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const ClientInfo = styled.div.attrs({ className: 'reviewCard-ClientInfo' })`
  display: flex;
  align-items: center;
`;

const ClientName = styled.span.attrs({ className: 'reviewCard-ClientName' })`
  font-size: 18px;
  font-weight: 600;
  color: ${p => p.$isCenter ? '#282828' : 'rgba(255,255,255,0.4)'};
`;

const ClientMeta = styled.span.attrs({ className: 'reviewCard-ClientMeta' })`
  font-size: 18px;
  color: ${p => p.$isCenter ? '#282828' : 'rgba(255,255,255,0.4)'};
  font-weight: 600;
`;
