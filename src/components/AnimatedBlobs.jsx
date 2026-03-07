import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const BlobsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const BlobWrapper = styled.div`
  position: absolute;
  will-change: transform, opacity;
`;

export const AnimatedBlobs = () => {
  const containerRef = useRef(null);
  const blob1Ref = useRef(null); // large magenta — moves down, shrinks, fades
  const blob2Ref = useRef(null); // small pink — flies up and fades
  const blob3Ref = useRef(null); // large coral-red — moves down, shrinks, fades
  const blob4Ref = useRef(null); // small salmon — flies up and fades

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Trigger: scroll from top of page until #works section is out and #case-studies is in view
      const scrollConfig = {
        trigger: 'body',
        start: 'top top',
        // End when the case studies section hits the top of the viewport
        end: () => {
          const caseStudies = document.querySelector('#works, #case-studies, section:nth-of-type(2)');
          return caseStudies
            ? `+=${caseStudies.offsetTop + caseStudies.offsetHeight * 0.3}`
            : '+=120%';
        },
        scrub: 1.2,
      };

      // BLOB 1 — large magenta: drifts down, shrinks to 0.3, fades out
      gsap.timeline({ scrollTrigger: scrollConfig })
        .fromTo(blob1Ref.current,
          { y: 0, x: 0, scale: 1, opacity: 1 },
          { y: '35vh', x: '3%', scale: 0.3, opacity: 0, ease: 'power2.in' }
        );

      // BLOB 2 — small pink: shoots upward and fades out quickly
      gsap.timeline({ scrollTrigger: { ...scrollConfig, scrub: 0.8, end: () => {
        const caseStudies = document.querySelector('#works, #case-studies, section:nth-of-type(2)');
        return caseStudies
          ? `+=${caseStudies.offsetTop * 0.7}`
          : '+=80%';
      }}} )
        .fromTo(blob2Ref.current,
          { y: 0, x: 0, scale: 1, opacity: 1 },
          { y: '-55vh', x: '-5%', scale: 0.5, opacity: 0, ease: 'power3.in' }
        );

      // BLOB 3 — large coral-red: drifts down, shrinks to 0.3, fades out
      gsap.timeline({ scrollTrigger: scrollConfig })
        .fromTo(blob3Ref.current,
          { y: 0, x: 0, scale: 1, opacity: 1 },
          { y: '30vh', x: '-3%', scale: 0.3, opacity: 0, ease: 'power2.in' }
        );

      // BLOB 4 — small salmon: shoots upward and fades out quickly
      gsap.timeline({ scrollTrigger: { ...scrollConfig, scrub: 0.8, end: () => {
        const caseStudies = document.querySelector('#works, #case-studies, section:nth-of-type(2)');
        return caseStudies
          ? `+=${caseStudies.offsetTop * 0.7}`
          : '+=80%';
      }}})
        .fromTo(blob4Ref.current,
          { y: 0, x: 0, scale: 1, opacity: 1 },
          { y: '-60vh', x: '5%', scale: 0.4, opacity: 0, ease: 'power3.in' }
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <BlobsContainer ref={containerRef}>

      {/* BLOB 1 — Large magenta, top-left */}
      <BlobWrapper
        ref={blob1Ref}
        style={{ width: 696, height: 696, top: -180, left: -60, filter: 'blur(72px)' }}
      >
        <svg viewBox="0 0 400 400" width="696" height="696" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g1_ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#E040B8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#CC00AA" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g1_body" cx="48%" cy="52%" r="45%">
              <stop offset="0%"   stopColor="#D0109A" stopOpacity="0.95" />
              <stop offset="55%"  stopColor="#B80088" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#960070" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g1_spec" cx="32%" cy="30%" r="28%">
              <stop offset="0%"   stopColor="#FF80DD" stopOpacity="0.75" />
              <stop offset="60%"  stopColor="#EE50CC" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#DD30BB" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g1_shadow" cx="70%" cy="72%" r="35%">
              <stop offset="0%"   stopColor="#600040" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#400020" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g1_rim" cx="20%" cy="78%" r="25%">
              <stop offset="0%"   stopColor="#FF60CC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EE40BB" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="198" ry="195" fill="url(#g1_ambient)" />
          <ellipse cx="200" cy="205" rx="188" ry="182" fill="url(#g1_body)" />
          <ellipse cx="200" cy="200" rx="185" ry="180" fill="url(#g1_shadow)" />
          <ellipse cx="200" cy="200" rx="185" ry="180" fill="url(#g1_spec)" />
          <ellipse cx="200" cy="200" rx="185" ry="180" fill="url(#g1_rim)" />
        </svg>
      </BlobWrapper>

      {/* BLOB 2 — Smaller bright pink, below-right of blob 1 */}
      <BlobWrapper
        ref={blob2Ref}
        style={{ width: 384, height: 384, top: 220, left: 160, filter: 'blur(60px)' }}
      >
         <svg viewBox="0 0 400 400" width="360" height="360" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g4_ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FF7080" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#EE2040" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g4_body" cx="48%" cy="50%" r="44%">
              <stop offset="0%"   stopColor="#FF4060" stopOpacity="0.92" />
              <stop offset="55%"  stopColor="#EE2050" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#CC0030" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g4_spec" cx="31%" cy="30%" r="25%">
              <stop offset="0%"   stopColor="#FFB0A0" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#FF7070" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g4_shadow" cx="66%" cy="68%" r="30%">
              <stop offset="0%"   stopColor="#580015" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#350008" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="196" ry="192" fill="url(#g4_ambient)" />
          <ellipse cx="200" cy="202" rx="184" ry="180" fill="url(#g4_body)" />
          <ellipse cx="200" cy="200" rx="182" ry="178" fill="url(#g4_shadow)" />
          <ellipse cx="200" cy="200" rx="182" ry="178" fill="url(#g4_spec)" />
        </svg>
      </BlobWrapper>

      {/* BLOB 3 — Large coral-red, top-right */}
      <BlobWrapper
        ref={blob3Ref}
        style={{ width: 672, height: 672, top: -160, right: -60, filter: 'blur(70px)' }}
      >
        <svg viewBox="0 0 400 400" width="672" height="672" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g3_ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FF5070" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#EE0030" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3_body" cx="52%" cy="50%" r="45%">
              <stop offset="0%"   stopColor="#FF1848" stopOpacity="0.94" />
              <stop offset="50%"  stopColor="#EE0838" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#CC0022" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3_spec" cx="34%" cy="29%" r="27%">
              <stop offset="0%"   stopColor="#FF9090" stopOpacity="0.72" />
              <stop offset="60%"  stopColor="#FF6060" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FF3040" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3_shadow" cx="68%" cy="70%" r="33%">
              <stop offset="0%"   stopColor="#600010" stopOpacity="0.46" />
              <stop offset="100%" stopColor="#3A0008" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3_rim" cx="78%" cy="22%" r="22%">
              <stop offset="0%"   stopColor="#FF7080" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF4060" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="198" ry="194" fill="url(#g3_ambient)" />
          <ellipse cx="200" cy="203" rx="186" ry="182" fill="url(#g3_body)" />
          <ellipse cx="200" cy="200" rx="184" ry="180" fill="url(#g3_shadow)" />
          <ellipse cx="200" cy="200" rx="184" ry="180" fill="url(#g3_spec)" />
          <ellipse cx="200" cy="200" rx="184" ry="180" fill="url(#g3_rim)" />
        </svg>
      </BlobWrapper>

      {/* BLOB 4 — Smaller salmon-pink, below-left of blob 3 */}
      <BlobWrapper
        ref={blob4Ref}
        style={{ width: 360, height: 360, top: 230, right: 160, filter: 'blur(58px)' }}
      >
        <svg viewBox="0 0 400 400" width="384" height="384" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g2_ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FF50CC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EE00BB" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2_body" cx="46%" cy="50%" r="44%">
              <stop offset="0%"   stopColor="#F020B8" stopOpacity="0.93" />
              <stop offset="55%"  stopColor="#DD10A5" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#BB0090" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2_spec" cx="30%" cy="28%" r="26%">
              <stop offset="0%"   stopColor="#FF90E0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FF50CC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2_shadow" cx="68%" cy="70%" r="32%">
              <stop offset="0%"   stopColor="#550035" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#330020" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="198" ry="194" fill="url(#g2_ambient)" />
          <ellipse cx="200" cy="202" rx="186" ry="182" fill="url(#g2_body)" />
          <ellipse cx="200" cy="200" rx="184" ry="180" fill="url(#g2_shadow)" />
          <ellipse cx="200" cy="200" rx="184" ry="180" fill="url(#g2_spec)" />
        </svg>
       
      </BlobWrapper>

    </BlobsContainer>
  );
};