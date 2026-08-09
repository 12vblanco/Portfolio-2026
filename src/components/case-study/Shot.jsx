/* Responsive screenshots for case-study pages.
   Pages declare their images through `shot()` (see utils.js), then render them
   with `<Shot>`: a <picture> with a WebP srcSet and a JPEG fallback. */

import styled from "styled-components";
import { MONO } from "./primitives.jsx";

export const Shot = ({ shot: s, alt, sizes, eager = false }) => (
  <picture>
    <source type="image/webp" srcSet={s.webp} sizes={sizes} />
    <ShotImg
      src={s.fallback}
      srcSet={s.jpg}
      sizes={sizes}
      alt={alt}
      width={s.width}
      height={s.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      data-reveal
    />
  </picture>
);

/* Labelled placeholder for an asset Victor will drop in later. Replace each
   <Frame> with a <Shot> once the file exists. */
export const Frame = ({ label, note, ratio = "16 / 9" }) => (
  <FrameBox style={{ aspectRatio: ratio }} data-reveal>
    <FrameInner>
      <FrameLabel>{label}</FrameLabel>
      {note && <FrameNote>{note}</FrameNote>}
    </FrameInner>
  </FrameBox>
);

/* Intrinsic width/height on the <img> keep the box reserved, so height:auto
   here scales it without any layout shift on load. */
const ShotImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: rgba(40, 40, 40, 0.025);
`;

const FrameBox = styled.div`
  width: 100%;
  background:
    repeating-linear-gradient(
      45deg,
      rgba(40, 40, 40, 0.015) 0 12px,
      transparent 12px 24px
    ),
    rgba(40, 40, 40, 0.025);
  border: 2px dashed #d6a3b0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
`;
const FrameInner = styled.div``;
const FrameLabel = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ff3863;
`;
const FrameNote = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  color: #999;
  margin-top: 0.5rem;
  word-break: break-word;
`;
