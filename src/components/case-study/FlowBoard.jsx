/* A design-board figure: a row of screens read left to right as a flow, with
   optional tabs switching the whole row between fidelities (wireframe, hi-fi,
   before/after). The board only supplies chrome; `renderScreen` decides what
   goes in each frame, so a page can mix screenshots and inline SVG.

   With a single view the tablist is dropped and the board is just a flow. */

import { useRef, useState } from "react";
import styled from "styled-components";
import { Caption, MONO } from "./primitives.jsx";

export const FlowBoard = ({
  title,
  views,
  screens,
  renderScreen,
  caption,
  tabsLabel = "View",
  idPrefix = "board",
}) => {
  const [view, setView] = useState(views[0].id);
  const tabRefs = useRef([]);

  // Left/right arrows move between tabs, as expected of a tablist.
  const onKeyDown = (e) => {
    const i = views.findIndex((v) => v.id === view);
    const next =
      e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = views[(next + views.length) % views.length];
    setView(target.id);
    tabRefs.current[views.indexOf(target)]?.focus();
  };

  const tabbed = views.length > 1;

  return (
    <BoardWrap data-reveal>
      <BoardBar>
        <BoardTitle>{title}</BoardTitle>
        {tabbed && (
          <TabList role="tablist" aria-label={tabsLabel} onKeyDown={onKeyDown}>
            {views.map((v, i) => (
              <Tab
                key={v.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${v.id}`}
                aria-selected={view === v.id}
                aria-controls={`${idPrefix}-panel-${v.id}`}
                tabIndex={view === v.id ? 0 : -1}
                $active={view === v.id}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </Tab>
            ))}
          </TabList>
        )}
      </BoardBar>

      {views.map((v) => (
        <BoardCanvas
          key={v.id}
          role={tabbed ? "tabpanel" : undefined}
          id={tabbed ? `${idPrefix}-panel-${v.id}` : undefined}
          aria-labelledby={tabbed ? `${idPrefix}-tab-${v.id}` : undefined}
          hidden={view !== v.id}
          $count={screens.length}
        >
          {screens.map((screen, i) => (
            <BoardCell key={screen.id}>
              {i > 0 && <Flow aria-hidden="true">→</Flow>}
              <BoardFrame>
                <FrameName>{screen.name}</FrameName>
                <FrameBody>{renderScreen(screen, v.id)}</FrameBody>
                {screen.note && <FrameNote>{screen.note}</FrameNote>}
              </BoardFrame>
            </BoardCell>
          ))}
        </BoardCanvas>
      ))}

      {caption && <Caption>{caption}</Caption>}
    </BoardWrap>
  );
};

const BoardWrap = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  background: #fffefa;
`;
const BoardBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid #e5e5e5;
  background: #fbfbf8;
`;
const BoardTitle = styled.span`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #999;
`;
const TabList = styled.div`
  display: flex;
  gap: 4px;
  padding: 3px;
  background: rgba(40, 40, 40, 0.05);
  border-radius: 999px;
`;
const Tab = styled.button`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 7px 14px 6px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(p) => (p.$active ? "#282828" : "transparent")};
  color: ${(p) => (p.$active ? "#fffefa" : "#777")};
  &:hover {
    color: ${(p) => (p.$active ? "#fffefa" : "#ff3863")};
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;
/* The dotted canvas reads as a design-tool artboard without imitating one. */
const BoardCanvas = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count}, 1fr);
  align-items: start;
  gap: 1.25rem;
  padding: 2rem 1.5rem;
  background-color: #f4f4f1;
  background-image: radial-gradient(rgba(40, 40, 40, 0.09) 1px, transparent 1px);
  background-size: 16px 16px;
  &[hidden] {
    display: none;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding: 1.5rem 1rem;
  }
`;
const BoardCell = styled.div`
  position: relative;
`;
/* The flow arrow sits in the gutter between frames, so it goes when they stack. */
const Flow = styled.span`
  position: absolute;
  left: -1.25rem;
  top: 46%;
  width: 1.25rem;
  text-align: center;
  color: #ff3863;
  font-weight: 700;
  font-size: 15px;
  @media (max-width: 700px) {
    display: none;
  }
`;
const BoardFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const FrameName = styled.span`
  font-family: ${MONO};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a8a8a;
`;
const FrameBody = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(40, 40, 40, 0.12);
  background: #fffefa;
  img {
    border-radius: 0;
    border: 0;
  }
`;
const FrameNote = styled.span`
  font-family: ${MONO};
  font-size: 10px;
  color: #9a9a9a;
  line-height: 1.5;
`;
