import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CTAButton } from '../common/CTAButton';
import { LINKS } from '../../data/siteConfig';

// ---------------------------------------------------------------------------
// Chart.js is loaded dynamically so it doesn't bloat your main bundle.
// Make sure Chart.js is installed:  npm install chart.js
// ---------------------------------------------------------------------------

const PALETTE = ['#FF3863', '#282828', '#FF8FAB', '#555555', '#FF6B8A', '#888888', '#FFADC2', '#AAAAAA'];
const PAGE_SIZE = 8;

function generateDemoData() {
  const features = [
    'Dashboard view', 'Onboarding checklist', 'Export button',
    'Settings panel', 'User profile', 'Help widget', 'Notifications', 'Search bar',
  ];
  const visitors = ['usr_a8f2k', 'usr_b3t9m', 'usr_c1p5x', 'usr_d7q2n', 'usr_e4r8l', 'usr_f6w3j', 'usr_g2s7h', 'usr_h9v4c'];
  const accounts = ['acct_alpha', 'acct_beta', 'acct_gamma', 'acct_delta', 'acct_epsilon'];
  const weights  = [0.26, 0.19, 0.15, 0.12, 0.10, 0.08, 0.06, 0.04];
  const now = Date.now();
  const events = [];

  for (let i = 0; i < 380; i++) {
    const r = Math.random();
    let fi = 0, acc = 0;
    for (let w = 0; w < weights.length; w++) {
      acc += weights[w];
      if (r < acc) { fi = w; break; }
    }
    events.push({
      featureId:   `feat_${fi}`,
      featureName: features[fi],
      visitorId:   visitors[Math.floor(Math.random() * visitors.length)],
      accountId:   accounts[Math.floor(Math.random() * accounts.length)],
      timestamp:   now - Math.random() * 30 * 86_400_000,
    });
  }
  return events.sort((a, b) => b.timestamp - a.timestamp);
}

// ---------------------------------------------------------------------------
// Hook — lazily loads Chart.js and creates/destroys canvas charts
// ---------------------------------------------------------------------------
function useChart(canvasRef, type, getData, deps) {
  const chartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);
      if (cancelled || !canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();
      const { data, options } = getData();
      chartRef.current = new Chart(canvasRef.current, { type, data, options });
    }

    init();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MetricCard({ value, label, accent }) {
  return (
    <MetricBox>
      {accent && <MetricAccent />}
      <MetricNum>{value}</MetricNum>
      <MetricLabel>{label}</MetricLabel>
    </MetricBox>
  );
}

function BarChartCard({ events }) {
  const canvasRef = useRef(null);
  const freq = {};
  events.forEach(e => { freq[e.featureName] = (freq[e.featureName] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const bgColors = sorted.map((_, i) => i === 0 ? '#FF3863' : i % 2 === 0 ? '#555' : '#e5e5e5');

  useChart(canvasRef, 'bar', () => ({
    data: {
      labels: sorted.map(([n]) => n.length > 14 ? n.slice(0, 12) + '…' : n),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: bgColors, borderRadius: 4, borderWidth: 0 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { family: 'Switzer', size: 10, weight: '700' }, autoSkip: false, maxRotation: 30, color: '#888' }, grid: { display: false } },
        y: { ticks: { font: { family: 'Switzer', size: 10 }, color: '#888' }, grid: { color: '#f0f0f0' } },
      },
    },
  }), [events]);

  return (
    <ChartCard>
      <ChartTitle>Clicks by feature</ChartTitle>
      <ChartSub>Top features by volume</ChartSub>
      <Legend>
        {sorted.map(([n, v], i) => (
          <LegendItem key={n}>
            <LegendSq style={{ background: bgColors[i] }} />
            {n.split(' ')[0]} ({v})
          </LegendItem>
        ))}
      </Legend>
      <CanvasWrap style={{ height: 200 }}>
        <canvas ref={canvasRef} role="img" aria-label="Bar chart of click counts per feature" />
      </CanvasWrap>
    </ChartCard>
  );
}

function LineChartCard({ events }) {
  const canvasRef = useRef(null);
  const byDay = {};
  events.forEach(e => {
    const d = new Date(e.timestamp).toISOString().split('T')[0];
    byDay[d] = (byDay[d] || 0) + 1;
  });
  const sorted = Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0]));

  useChart(canvasRef, 'line', () => ({
    data: {
      labels: sorted.map(([d]) => d.slice(5)),
      datasets: [{
        data: sorted.map(([, v]) => v),
        borderColor: '#FF3863',
        backgroundColor: 'rgba(255,56,99,0.08)',
        tension: 0.4, fill: true, pointRadius: 0, borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { family: 'Switzer', size: 10, weight: '700' }, maxTicksLimit: 8, color: '#888' }, grid: { display: false } },
        y: { ticks: { font: { family: 'Switzer', size: 10 }, color: '#888' }, grid: { color: '#f0f0f0' } },
      },
    },
  }), [events]);

  return (
    <ChartCard>
      <ChartTitle>Daily trend</ChartTitle>
      <ChartSub>Click volume over 30 days</ChartSub>
      <CanvasWrap style={{ height: 200 }}>
        <canvas ref={canvasRef} role="img" aria-label="Line chart of daily click volume" />
      </CanvasWrap>
    </ChartCard>
  );
}

function PieChartCard({ events }) {
  const canvasRef = useRef(null);
  const freq = {};
  events.forEach(e => { freq[e.featureName] = (freq[e.featureName] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const total  = sorted.reduce((s, [, v]) => s + v, 0);

  useChart(canvasRef, 'doughnut', () => ({
    data: {
      labels: sorted.map(([n, v]) => `${n.split(' ')[0]} ${Math.round(v / total * 100)}%`),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: PALETTE.slice(0, sorted.length), borderWidth: 3, borderColor: '#FFFEFA' }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: { legend: { position: 'right', labels: { font: { family: 'Switzer', size: 10, weight: '700' }, boxWidth: 9, padding: 6, color: '#282828' } } },
    },
  }), [events]);

  return (
    <ChartCard>
      <ChartTitle>Feature share</ChartTitle>
      <ChartSub>Proportional breakdown</ChartSub>
      <CanvasWrap style={{ height: 180 }}>
        <canvas ref={canvasRef} role="img" aria-label="Doughnut chart of feature click share" />
      </CanvasWrap>
    </ChartCard>
  );
}

function VisitorChartCard({ events }) {
  const canvasRef = useRef(null);
  const freq = {};
  events.forEach(e => { freq[e.visitorId] = (freq[e.visitorId] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

  useChart(canvasRef, 'bar', () => ({
    data: {
      labels: sorted.map(([id]) => id),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: '#282828', borderRadius: 3, borderWidth: 0 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { family: 'Switzer', size: 10 }, color: '#888' }, grid: { color: '#f0f0f0' } },
        y: { ticks: { font: { family: 'Switzer', size: 10, weight: '700' }, color: '#888' }, grid: { display: false } },
      },
    },
  }), [events]);

  return (
    <ChartCard>
      <ChartTitle>Top visitors</ChartTitle>
      <ChartSub>By total clicks</ChartSub>
      <CanvasWrap style={{ height: 180 }}>
        <canvas ref={canvasRef} role="img" aria-label="Horizontal bar of top visitors by click count" />
      </CanvasWrap>
    </ChartCard>
  );
}

// Wrap EventsTable with a key derived from events length so React remounts
// (and resets page to 1) automatically whenever the events array changes,
// avoiding the setState-in-effect anti-pattern.
function EventsTableInner({ events }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const slice = events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function exportCSV() {
    const header = 'featureName,featureId,visitorId,accountId,date,time\n';
    const rows = events.map(e => {
      const dt = new Date(e.timestamp);
      return [e.featureName, e.featureId, e.visitorId, e.accountId,
        dt.toISOString().split('T')[0],
        dt.toISOString().split('T')[1].slice(0, 8),
      ].map(v => `"${v}"`).join(',');
    }).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([header + rows], { type: 'text/csv' }));
    a.download = 'pendo-clicks.csv';
    a.click();
  }

  return (
    <TableCard>
      <TableTopRow>
        <div>
          <ChartTitle style={{ display: 'inline' }}>Recent events</ChartTitle>
          <EventCount>{events.length.toLocaleString()} events</EventCount>
        </div>
        <ExportBtn onClick={exportCSV}>↓ Export CSV</ExportBtn>
      </TableTopRow>
      <StyledTable>
        <thead>
          <tr>
            <Th style={{ width: '32%' }}>Feature</Th>
            <Th style={{ width: '20%' }}>Visitor</Th>
            <Th style={{ width: '18%' }}>Account</Th>
            <Th style={{ width: '15%' }}>Date</Th>
            <Th style={{ width: '15%' }}>Time</Th>
          </tr>
        </thead>
        <tbody>
          {slice.map((e, i) => {
            const dt = new Date(e.timestamp);
            return (
              <tr key={i}>
                <Td><FeatureTag>{e.featureName}</FeatureTag></Td>
                <Td><Mono>{e.visitorId}</Mono></Td>
                <Td><Mono>{e.accountId}</Mono></Td>
                <Td><DateCell>{dt.toISOString().split('T')[0]}</DateCell></Td>
                <Td><DateCell>{dt.toISOString().split('T')[1].slice(0, 8)}</DateCell></Td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination>
        <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>← Prev</PageBtn>
        <PageInfo>{page} / {totalPages}</PageInfo>
        <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next →</PageBtn>
      </Pagination>
    </TableCard>
  );
}

// Key prop remounts EventsTableInner whenever events.length changes,
// resetting page to 1 without calling setState inside an effect.
function EventsTable({ events }) {
  return <EventsTableInner key={events.length} events={events} />;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export const PendoAnalyticsDashboard = () => {
  const events = generateDemoData();

  const freq    = {};
  events.forEach(e => { freq[e.featureName] = (freq[e.featureName] || 0) + 1; });
  const topFeat = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

  const metrics = [
    { value: events.length.toLocaleString(), label: 'Total clicks', accent: true },
    { value: new Set(events.map(e => e.featureId)).size, label: 'Features' },
    { value: new Set(events.map(e => e.visitorId)).size, label: 'Visitors' },
    { value: new Set(events.map(e => e.accountId)).size, label: 'Accounts' },
    { value: topFeat ? topFeat[0].split(' ')[0] : '—', label: 'Top feature' },
  ];

  return (
    <DashSection>
      <DashInner>
        <DashNav>
          <NavRight>
            <StatusPill>
              <PulseDot />
              Pendo Analytics
            </StatusPill>
          </NavRight>
        </DashNav>

        <CTAStrip>
          <CTAText>
            <CTATitle>Want this dashboard connected to your Pendo data?</CTATitle>
            <CTASub>Customise your own data dashboard pulling data directly from Pendo</CTASub>
          </CTAText>
          <CTAActions>
            <CTAButton id="calend-pendo-analyticsCTA" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
              Book a free call
            </CTAButton>
            <CTAButton variant="secondary" href={LINKS.upwork} target="_blank" rel="noopener noreferrer">
              Upwork profile
            </CTAButton>
          </CTAActions>
        </CTAStrip>

        <MetricsGrid>
          {metrics.map(m => <MetricCard key={m.label} {...m} />)}
        </MetricsGrid>

        <ChartsGrid>
          <BarChartCard  events={events} />
          <LineChartCard events={events} />
          <PieChartCard  events={events} />
          <VisitorChartCard events={events} />
        </ChartsGrid>

        <EventsTable events={events} />
      </DashInner>
    </DashSection>
  );
};

// ---------------------------------------------------------------------------
// Styled Components
// ---------------------------------------------------------------------------

const DashSection = styled.div`
  background: #FAFAFA;
    padding: 1rem 3rem;
    @media (max-width: 468px) { 
        padding: .6rem;
   }
`;

const DashInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Brand = styled.span`
  font-family: 'Switzer', sans-serif;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #282828;
`;

const BrandDot = styled.span`
  color: #FF3863;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1.5px solid #282828;
  border-radius: 100px;
  padding: 5px 14px;
  font-family: 'Switzer', sans-serif;
  font-size: 13px;
  font-weight: 700;
  background: #FFFEFA;
  color: #282828;
`;

const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  background: #FF3863;
  border-radius: 50%;
  flex-shrink: 0;
  animation: breathe 2.2s cubic-bezier(0.4,0,0.2,1) infinite;
  box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);

  @keyframes breathe {
    0%   { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,56,99,0.4); }
    50%  { transform: scale(1.2);  opacity: 1;   box-shadow: 0 0 0 6px rgba(255,56,99,0); }
    100% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,56,99,0); }
  }
`;

const CTAStrip = styled.div`
  background: #282828;
  border-radius: 10px;
  padding: 5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 2rem;

  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; padding: 3rem 2rem; gap: 2rem}
`;

const CTAText = styled.div``;

const CTATitle = styled.p`
  font-family: 'Switzer', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: #FFFEFA;
  margin-bottom: 2px;
`;

const CTASub = styled.p`
  font-family: 'Switzer', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255,254,250,0.65);
`;

const CTAActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
  @media (max-width: 468px) { 
        gap: 1rem;
   }
`;

const MetricBox = styled.div`
  background: #FFFEFA;
  border: 1.5px solid #e5e5e5;
  border-radius: 12px;
  padding: 14px 16px;
  position: relative;
  @media (max-width: 468px) { 
        padding: .8rem;
   }
`;

const MetricAccent = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #FF3863;
`;

const MetricNum = styled.div`
  font-family: 'Switzer', sans-serif;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -1px;
  color: #282828;
  line-height: 1;
  @media (max-width: 468px) { 
          font-size: 22px;
;
   }
`;

const MetricLabel = styled.div`
  font-family: 'Switzer', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #888;
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ChartCard = styled.div`
  background: #FFFEFA;
  border: 1.5px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
`;

const ChartTitle = styled.div`
  font-family: 'Switzer', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.2px;
  color: #282828;
  margin-bottom: 2px;
`;

const ChartSub = styled.div`
  font-family: 'Switzer', sans-serif;
  font-size: 15px;
  color: #888;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Switzer', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #282828;
`;

const LegendSq = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 2px;
  flex-shrink: 0;
`;

const CanvasWrap = styled.div`
  position: relative;
  width: 100%;

  canvas { display: block; }
`;

const TableCard = styled.div`
  background: #FFFEFA;
  border: 1.5px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
`;

const TableTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
`;

const EventCount = styled.span`
  font-family: 'Switzer', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #888;
  margin-left: 10px;
`;

const ExportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid #282828;
  border-radius: 100px;
  padding: 5px 14px;
  font-family: 'Switzer', sans-serif;
  font-size: 12px;
  font-weight: 700;
  background: #FFFEFA;
  color: #282828;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: #282828; color: #FFFEFA; }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
`;

const Th = styled.th`
  text-align: left;
  font-family: 'Switzer', sans-serif;
  font-weight: 800;
  font-size: 10px;
  color: #888;
  padding: 8px 10px;
  border-bottom: 1.5px solid #e5e5e5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Td = styled.td`
  padding: 9px 10px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
  color: #282828;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  tr:last-child & { border-bottom: none; }
  tr:hover & { background: #f7f7f7; }
`;

const FeatureTag = styled.span`
  display: inline-block;
  border: 1.5px solid #282828;
  border-radius: 100px;
  padding: 1px 9px;
  font-family: 'Switzer', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #282828;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Mono = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: #888;
`;

const DateCell = styled.span`
  font-family: 'Switzer', sans-serif;
  font-size: 11px;
  color: #888;
  font-weight: 600;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  justify-content: flex-end;
`;

const PageBtn = styled.button`
  display: inline-flex;
  align-items: center;
  border: 1.5px solid #282828;
  border-radius: 100px;
  padding: 5px 14px;
  font-family: 'Switzer', sans-serif;
  font-size: 12px;
  font-weight: 700;
  background: #FFFEFA;
  color: #282828;
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) { background: #282828; color: #FFFEFA; }
  &:disabled { opacity: 0.35; cursor: default; }
`;

const PageInfo = styled.span`
  font-family: 'Switzer', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #282828;
`;