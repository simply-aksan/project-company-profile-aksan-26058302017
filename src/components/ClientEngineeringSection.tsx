import { useRef } from 'react';
import { Code2, Cpu, Layers, Sparkles } from 'lucide-react';
import { CLIENT_CADENCE, CLIENT_CAPABILITIES } from '../data/aksanContent';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { SakugaBtn } from './SakugaControl';

interface ClientEngineeringSectionProps {
  onStartClientBrief: () => void;
}

const CAP_ICONS = [Layers, Sparkles, Cpu, Code2];

export function ClientEngineeringSection({
  onStartClientBrief,
}: ClientEngineeringSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cadencePathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        '.cap-chapter',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.cap-flow-stage',
            start: 'top 90%',
            fastScrollEnd: true,
            once: true,
          },
        }
      );

      const flowSpline = pathRef.current;
      if (flowSpline) {
        const len = flowSpline.getTotalLength();
        gsap.set(flowSpline, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(flowSpline, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cap-flow-stage',
            start: 'top 78%',
            end: 'bottom 58%',
            scrub: 0.85,
          },
        });
      }

      const cadenceSpline = cadencePathRef.current;
      if (cadenceSpline) {
        const cLen = cadenceSpline.getTotalLength();
        gsap.set(cadenceSpline, { strokeDasharray: cLen, strokeDashoffset: cLen });
        gsap.to(cadenceSpline, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cadence-panel',
            start: 'top 86%',
            end: 'bottom 55%',
            scrub: 0.65,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="client-engineering"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden border-b border-[var(--hairline)] bg-[#F7ECE6] py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1220px] px-4 sm:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[660px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-index text-xs tracking-[0.16em] text-[#B8431B] uppercase">
                02 // CLIENT ENGINEERING
              </span>
              <span className="font-mono-index inline-flex items-center gap-1.5 rounded-full border border-[#161920]/20 bg-white/80 px-3 py-1 text-[11px] tracking-[0.1em] text-[#161920] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E85427]" />
                Available for Engagement
              </span>
            </div>

            <h2
              className="mt-4 font-semibold tracking-[-0.03em] text-[#161920]"
              style={{ fontSize: 'clamp(32px, 4.2vw, 54px)', lineHeight: 1.06 }}
            >
              Structured engineering designed to remove technical chaos.
            </h2>
          </div>

          <p className="max-w-[42ch] text-base leading-relaxed text-[#4A515D]">
            Rather than stacking rigid cookie-cutter modules, every capability weaves into one
            coherent system—crafted so your team ships cleanly and stays independent.
          </p>
        </div>

        {/* Staggered Asymmetric Flow Stage + Continuous Winding Loop Spline */}
        <div className="cap-flow-stage relative mt-14 lg:mt-20">
          {/* Expressive Two26-Inspired Winding Loop SVG Spine weaving through margins & gaps */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 top-0 bottom-0 hidden lg:block"
          >
            <svg
              viewBox="0 0 1280 1760"
              preserveAspectRatio="none"
              fill="none"
              className="h-full w-full"
            >
              <path
                d="M 1020 30 C 1220 70, 1240 310, 1080 410 C 860 530, 140 430, 60 640 C -10 820, 260 950, 940 990 C 1220 1010, 1230 1250, 1060 1370 C 840 1510, 220 1440, 160 1710"
                stroke="rgba(232, 84, 39, 0.22)"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              <path
                ref={pathRef}
                d="M 1020 30 C 1220 70, 1240 310, 1080 410 C 860 530, 140 430, 60 640 C -10 820, 260 950, 940 990 C 1220 1010, 1230 1250, 1060 1370 C 840 1510, 220 1440, 160 1710"
                stroke="#E85427"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 4 Staggered Alternating Capability Chapters */}
          <div className="relative z-10 space-y-12 lg:space-y-24">
            {CLIENT_CAPABILITIES.map((cap, idx) => {
              const Icon = CAP_ICONS[idx % CAP_ICONS.length];
              const isReversed = idx % 2 === 1;
              return (
                <article
                  key={cap.code}
                  className={`cap-chapter relative flex flex-col gap-6 rounded-[28px] border-2 border-[#161920] bg-[#FAF8F3] p-5 shadow-[6px_6px_0px_rgba(22,25,32,0.12)] sm:p-7 lg:flex-row lg:items-center lg:gap-10 lg:p-8 lg:pb-10 ${
                    isReversed ? 'lg:ml-auto lg:w-[82%] lg:flex-row-reverse' : 'lg:mr-auto lg:w-[82%]'
                  }`}
                >
                  {/* Visual Frame (Video or Curated Photography) */}
                  <div className="relative w-full shrink-0 sm:pb-4 lg:w-[46%]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#161920]/15 bg-[#111218]">
                      {cap.mediaType === 'video' ? (
                        <video
                          autoPlay={!prefersReducedMotion()}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={cap.posterSrc}
                          aria-label={cap.mediaAlt}
                          className="h-full w-full object-cover"
                        >
                          <source src={cap.mediaSrc} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={cap.mediaSrc}
                          alt={cap.mediaAlt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}

                      <span className="font-mono-index absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-[#161920] bg-[#FAF8F3]/95 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#161920] uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E85427]" />
                        {cap.code}
                      </span>
                    </div>

                    {/* Floating Rotated Editorial Capsule neatly inset */}
                    <span
                      className={`font-mono-index mt-3 inline-block rounded-full border-2 border-[#161920] bg-[#E85427] px-3.5 py-1 text-[10px] font-semibold tracking-[0.07em] text-[#FAF8F3] shadow-[3px_3px_0px_#161920] uppercase sm:absolute sm:bottom-0 ${
                        isReversed ? 'sm:left-2 sm:rotate-[-2deg]' : 'sm:right-2 sm:rotate-[2deg]'
                      }`}
                    >
                      {cap.capsuleNote}
                    </span>
                  </div>

                  {/* Narrative + Split Graphic Icon Headline + Deliverables */}
                  <div className="min-w-0 flex-1 pt-1 sm:pt-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-2xl font-bold tracking-[-0.03em] text-[#161920] sm:text-3xl">
                        {cap.titleLeft}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#161920] bg-[#F7ECE6] text-[#E85427]"
                      >
                        <Icon className="h-4 w-4 stroke-[2.2]" />
                      </span>
                      <span className="font-display text-2xl font-bold tracking-[-0.03em] text-[#E85427] sm:text-3xl">
                        {cap.titleRight}
                      </span>
                    </div>

                    <p className="mt-3.5 max-w-[54ch] text-sm leading-relaxed text-[#4A515D] sm:text-base">
                      {cap.summary}
                    </p>

                    <ul className="mt-5 grid grid-cols-1 gap-2.5 border-t border-[var(--hairline)] pt-4 sm:grid-cols-2">
                      {cap.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#161920]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E85427]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Delivery Cadence Panel */}
        <div className="cadence-panel relative z-10 mt-16 overflow-hidden rounded-[26px] border-2 border-[#161920] bg-[#FAF8F3] p-6 shadow-[8px_8px_0px_rgba(22,25,32,0.12)] sm:p-9">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--hairline)] pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono-index text-[11px] tracking-[0.14em] text-[#B8431B] uppercase">
                HOW WE WORK
              </span>
              <h3 className="mt-1 font-display text-xl font-bold tracking-[-0.02em] text-[#161920] sm:text-2xl">
                Three calm phases from alignment to independent handover
              </h3>
            </div>

            <SakugaBtn
              onClick={(done) => {
                done();
                setTimeout(onStartClientBrief, 180);
              }}
              ariaLabel="Discuss a Client Project"
            >
              Discuss a Client Project
            </SakugaBtn>
          </div>

          <div className="mt-5 hidden md:block" aria-hidden="true">
            <svg viewBox="0 0 900 44" fill="none" className="h-9 w-full">
              <path
                d="M 20 26 C 170 4, 290 40, 450 22 C 610 4, 730 38, 880 18"
                stroke="rgba(232, 84, 39, 0.22)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                ref={cadencePathRef}
                d="M 20 26 C 170 4, 290 40, 450 22 C 610 4, 730 38, 880 18"
                stroke="#E85427"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="20" cy="26" r="4.5" fill="#E85427" />
              <circle cx="450" cy="22" r="4.5" fill="#E85427" />
              <circle cx="880" cy="18" r="4.5" fill="#E85427" />
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CLIENT_CADENCE.map((item) => (
              <div key={item.step}>
                <span className="font-mono-index text-[11px] tracking-[0.14em] text-[#E85427] uppercase">
                  {item.step}
                </span>
                <div className="mt-1.5 text-base font-semibold text-[#161920]">
                  {item.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#59606E]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
