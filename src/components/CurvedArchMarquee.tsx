import { useEffect, useRef } from 'react';
import { ARCH_MARQUEE_TEXT } from '../data/aksanContent';
import { prefersReducedMotion } from '../lib/gsap';

const CLEAN_PHRASE = ARCH_MARQUEE_TEXT.replace(/^\s*\u2022\s*|\s*\u2022\s*$/g, '').trim();
const SINGLE_SEGMENT = `${CLEAN_PHRASE}\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0`;
const REPEATED_PHRASE = Array.from({ length: 6 }, () => SINGLE_SEGMENT).join('');

export function CurvedArchMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTSpanElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const textPathEl = textPathRef.current;
    if (!sectionEl || !textPathEl || prefersReducedMotion()) return;

    let rafId = 0;
    let isVisible = true;
    let offset = 0;
    let lastTime = performance.now();
    const wrapDistance = measureRef.current?.getComputedTextLength() || 1180;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '120px' },
    );
    observer.observe(sectionEl);

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isVisible) {
        offset -= dt * 58;
        if (offset <= -wrapDistance) {
          offset += wrapDistance;
        }
        textPathEl.setAttribute('startOffset', `${offset.toFixed(1)}px`);
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-label={CLEAN_PHRASE}
      className="relative w-full overflow-hidden bg-[#F4F1EA] select-none"
    >
      <svg
        viewBox="0 0 1440 185"
        preserveAspectRatio="xMidYMid slice"
        className="block h-[clamp(104px,12.8vw,250px)] w-full"
        role="img"
        aria-label={CLEAN_PHRASE}
      >
        <defs>
          {/* Single shared concentric Bezier spline so text stays dead-center inside the orange band */}
          <path
            id="aksan-arch-ribbon-text"
            d="M -420 165 Q 720 -77 1860 165"
            fill="none"
          />
        </defs>

        {/* Blush cream ground fills seamlessly below the exact same arch curve */}
        <path
          d="M -420 165 Q 720 -77 1860 165 L 1860 220 L -420 220 Z"
          fill="#F7ECE6"
        />

        {/* Terracotta ribbon straddles the arch centerline uniformly */}
        <path
          d="M -420 165 Q 720 -77 1860 165"
          fill="none"
          stroke="#E85427"
          strokeWidth="58"
          strokeLinecap="round"
        />

        <text
          fill="#FFFFFF"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="3.2"
          dy="7.5"
        >
          <textPath
            ref={textPathRef}
            href="#aksan-arch-ribbon-text"
            startOffset="0px"
          >
            <tspan ref={measureRef}>{SINGLE_SEGMENT}</tspan>
            {REPEATED_PHRASE}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
