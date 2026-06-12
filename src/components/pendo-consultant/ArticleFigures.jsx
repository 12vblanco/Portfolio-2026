import styled from 'styled-components';

// Inline figures for the /insights article pages. All pure SVG/CSS so they
// prerender into the static HTML, no chart library needed on these pages.

// ─── Figure: the four audit areas ────────────────────────────────────────────

const auditAreasData = [
  { number: '01', title: 'Installation health', text: 'Snippet on every route, firing consistently, identifying visitors and accounts correctly.' },
  { number: '02', title: 'Feature tagging', text: 'Stable selectors, consistent naming, no tags silently recording zero data.' },
  { number: '03', title: 'Segments & metadata', text: 'Internal users excluded, metadata fields populated and trustworthy.' },
  { number: '04', title: 'Guide configuration', text: 'Multi-step flows, sensible throttling, CTAs that produce a measurable signal.' },
];

export const AuditAreasFigure = () => (
  <FigureBlock>
    <AreasGrid>
      {auditAreasData.map((area) => (
        <AreaCard key={area.number}>
          <AreaNumber>{area.number}</AreaNumber>
          <AreaTitle>{area.title}</AreaTitle>
          <AreaText>{area.text}</AreaText>
        </AreaCard>
      ))}
    </AreasGrid>
    <FigureCaption>The four areas every Pendo installation audit covers.</FigureCaption>
  </FigureBlock>
);

// ─── Figure: where audit issues typically show up ────────────────────────────

const issueBarsData = [
  { label: 'Segments & internal users', value: 80 },
  { label: 'Feature tagging', value: 65 },
  { label: 'Guide configuration', value: 55 },
  { label: 'Snippet & identity', value: 35 },
];

export const AuditIssueBarsFigure = () => (
  <FigureBlock>
    <BarsWrapper>
      {issueBarsData.map((bar) => (
        <BarRow key={bar.label}>
          <BarLabel>{bar.label}</BarLabel>
          <BarTrack>
            <BarFill style={{ width: `${bar.value}%` }} />
          </BarTrack>
          <BarValue>{bar.value}%</BarValue>
        </BarRow>
      ))}
    </BarsWrapper>
    <FigureCaption>
      Share of audits where I find at least one significant issue in each area, across the installations I have reviewed. Segmentation is almost always the weakest link.
    </FigureCaption>
  </FigureBlock>
);

// ─── Figure: raw clicks vs unique visitors (SVG line chart) ──────────────────

const clicksLine    = '40,200 100,195 160,185 220,190 280,170 340,110 400,95 460,120 520,130 580,125';
const visitorsLine  = '40,215 100,212 160,208 220,210 280,205 340,195 400,190 460,192 520,188 580,185';

export const ClicksVsVisitorsFigure = () => (
  <FigureBlock>
    <ChartFrame>
      <svg viewBox="0 0 620 270" role="img" aria-label="Line chart comparing raw click counts with unique visitors over thirty days. Clicks spike sharply after a feature launch while unique visitors rise only slightly.">
        {/* horizontal gridlines */}
        {[60, 120, 180, 240].map((y) => (
          <line key={y} x1="40" y1={y} x2="580" y2={y} stroke="#e5e5e5" strokeWidth="1" />
        ))}
        {/* launch marker */}
        <line x1="340" y1="50" x2="340" y2="240" stroke="#999" strokeWidth="1" strokeDasharray="4 4" />
        <text x="348" y="62" fontSize="13" fill="#999">feature launch</text>
        {/* series */}
        <polyline points={clicksLine} fill="none" stroke="#FF3863" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={visitorsLine} fill="none" stroke="#282828" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {/* axis labels */}
        <text x="40" y="262" fontSize="13" fill="#999">Day 1</text>
        <text x="548" y="262" fontSize="13" fill="#999">Day 30</text>
      </svg>
      <ChartLegend>
        <LegendItem><LegendSwatch $color="#FF3863" /> Raw clicks</LegendItem>
        <LegendItem><LegendSwatch $color="#282828" /> Unique visitors</LegendItem>
      </ChartLegend>
    </ChartFrame>
    <FigureCaption>
      Illustrative: after a launch, raw clicks double while unique visitors barely move. Totals alone overstate adoption; the same people are clicking more.
    </FigureCaption>
  </FigureBlock>
);

// ─── Figure: Aggregation API data flow ───────────────────────────────────────

const flowSteps = [
  { title: 'Your product', text: 'Pendo agent captures clicks, page loads, guide events' },
  { title: 'Pendo cloud', text: 'Events stored against features, visitors and accounts' },
  { title: 'Aggregation API', text: 'Pipeline queries: filter, group, join, time series' },
  { title: 'Your dashboard', text: 'Live charts and reports, no manual exports' },
];

export const ApiFlowFigure = () => (
  <FigureBlock>
    <FlowWrapper>
      {flowSteps.map((step, i) => (
        <FlowStep key={step.title}>
          <FlowCard $accent={i === 2}>
            <FlowTitle>{step.title}</FlowTitle>
            <FlowText>{step.text}</FlowText>
          </FlowCard>
          {i < flowSteps.length - 1 && <FlowArrow aria-hidden="true">→</FlowArrow>}
        </FlowStep>
      ))}
    </FlowWrapper>
    <FigureCaption>From event capture to a live custom report, the Aggregation API is the bridge.</FigureCaption>
  </FigureBlock>
);

// ─── Shared styled components ────────────────────────────────────────────────

const FigureBlock = styled.figure`
  margin: 1.5rem 0;
  width: 100%;
`;

const FigureCaption = styled.figcaption`
  font-size: 15px;
  color: #999;
  line-height: 1.6;
  margin-top: 0.9rem;
  max-width: 720px;
`;

// Audit areas grid

const AreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const AreaCard = styled.div`
  background: rgba(40, 40, 40, 0.02);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1.5rem 1.5rem 1.25rem;
`;

const AreaNumber = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
`;

const AreaTitle = styled.span`
  display: block;
  font-size: 19px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 0.4rem;
`;

const AreaText = styled.p`
  font-size: 15px !important;
  line-height: 1.6;
  color: #555;
  margin: 0;
`;

// Issue bars

const BarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  background: rgba(40, 40, 40, 0.02);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1.75rem;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 600px) { flex-wrap: wrap; gap: 0.4rem; }
`;

const BarLabel = styled.span`
  flex: 0 0 220px;
  font-size: 15px;
  font-weight: 600;
  color: #282828;
  @media (max-width: 600px) { flex-basis: 100%; }
`;

const BarTrack = styled.div`
  flex: 1;
  height: 14px;
  background: #f0f0f0;
  border-radius: 7px;
  overflow: hidden;
  min-width: 120px;
`;

const BarFill = styled.div`
  height: 100%;
  background: #FF3863;
  border-radius: 7px;
`;

const BarValue = styled.span`
  flex: 0 0 44px;
  font-size: 15px;
  font-weight: 700;
  color: #282828;
  text-align: right;
`;

// SVG chart frame

const ChartFrame = styled.div`
  background: rgba(40, 40, 40, 0.02);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1.5rem 1.5rem 1rem;

  svg { width: 100%; height: auto; display: block; }
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
  color: #555;
`;

const LegendSwatch = styled.span`
  width: 22px;
  height: 4px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;

// API flow

const FlowWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FlowStep = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  &:last-child { flex: 1; }
  @media (max-width: 968px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FlowCard = styled.div`
  flex: 1;
  background: ${({ $accent }) => ($accent ? '#282828' : 'rgba(40, 40, 40, 0.02)')};
  border: 1px solid ${({ $accent }) => ($accent ? '#282828' : '#e5e5e5')};
  border-radius: 12px;
  padding: 1.25rem;
  width: 100%;

  span { color: ${({ $accent }) => ($accent ? '#FFFEFA' : '#282828')}; }
  p { color: ${({ $accent }) => ($accent ? 'rgba(255, 254, 250, 0.75)' : '#555')}; }
`;

const FlowTitle = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 0.35rem;
`;

const FlowText = styled.p`
  font-size: 14px !important;
  line-height: 1.55;
  margin: 0;
`;

const FlowArrow = styled.span`
  font-size: 24px;
  color: #FF3863;
  font-weight: 700;
  flex-shrink: 0;
  @media (max-width: 968px) { transform: rotate(90deg); }
`;
