import gsap from 'gsap';

const r = (min, max) => min + Math.random() * (max - min);

export const startFloat = (el) => {
  gsap.to(el, {
    y: r(-4, -8),
    rotation: r(-65, 75),
    duration: r(1.6, 2.4),
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};