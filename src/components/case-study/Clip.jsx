/* A short, silent, looping screen recording: how a build behaves, where a
   screenshot can only show how it looks.

   It autoplays because it carries no sound and needs no decision, but it stops
   for anyone who asks for reduced motion, and it always offers a pause control:
   looping motion longer than five seconds has to be pausable (WCAG 2.2.2). */

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { prefersReducedMotion } from "../../utils/motion";
import { MONO } from "./primitives.jsx";

export const Clip = ({ src, poster, width, height, label }) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion()) return;
    // Autoplay can still be refused (low power mode); the poster then stands in.
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <ClipWrap data-reveal>
      <Video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
      <Toggle type="button" onClick={toggle}>
        {playing ? "❚❚ Pause" : "▶ Play"}
      </Toggle>
    </ClipWrap>
  );
};

const ClipWrap = styled.div`
  position: relative;
  line-height: 0;
`;
/* Matches ShotImg, so a clip and a screenshot sit together without a seam. */
const Video = styled.video`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: rgba(40, 40, 40, 0.025);
`;
const Toggle = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1;
  padding: 8px 12px 7px;
  color: #fffefa;
  background: rgba(40, 40, 40, 0.72);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.2s ease;
  &:hover {
    background: #ff3863;
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;
