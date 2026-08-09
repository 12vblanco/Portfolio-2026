/* Scroll reveal shared by every case-study page: anything marked [data-reveal]
   rises into place once, and not at all when the visitor asks for less motion. */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { prefersReducedMotion } from "../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

export const useReveal = (rootRef) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);
};
