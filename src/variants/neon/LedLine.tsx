import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Tira LED a la izquierda que se va encendiendo con el scroll, como la del techo del local.
export const LedLine = () => {
  const line = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      line.current,
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } },
    );
  });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed top-0 bottom-0 left-0 z-20 w-[3px] bg-white/5 md:left-3">
      <span ref={line} className="led-bar block h-full w-full origin-top" />
    </div>
  );
};
