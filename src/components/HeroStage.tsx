import { useEffect, useRef } from 'react';
import { CalmInkField } from '../art/CalmInkField';
import { HERO_MEDIA, PortalSectionId } from '../data/aksanContent';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';
import { SakugaBtn } from './SakugaControl';

interface HeroStageProps {
  onNavigate: (id: PortalSectionId) => void;
  onOpenDialogue: () => void;
}

export function HeroStage({ onNavigate, onOpenDialogue }: HeroStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const inkFieldRef = useRef<CalmInkField | null>(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;
    let engine: CalmInkField | null = null;
    try {
      engine = new CalmInkField(host);
      inkFieldRef.current = engine;
    } catch {
      // Mineral stone + curated visuals render cleanly even if WebGL is disabled
    }
    return () => {
      inkFieldRef.current = null;
      engine?.dispose();
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-eyebrow', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
        .fromTo(
          '.hero-line',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.08, clearProps: 'transform' },
          '-=0.45'
        )
        .fromTo('.hero-sub', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55')
        .fromTo(
          '.hero-cta-row',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, clearProps: 'transform,opacity' },
          '-=0.5'
        )
        .fromTo(
          '.hero-visual-stack',
          { y: 24, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.95, clearProps: 'transform,opacity' },
          '-=0.75'
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          inkFieldRef.current?.setScrollProgress(self.progress);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--surface-paper)]"
    >
      {/* Layer 0: Living Calm Flowing Ink Field Canvas */}
      <div
        ref={canvasHostRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />

      {/* Left Readability Scrim protecting expressive display type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(244,241,234,0.96) 0%, rgba(244,241,234,0.88) 48%, rgba(244,241,234,0.22) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(244,241,234,0.92) 0%, rgba(244,241,234,0.82) 70%, rgba(244,241,234,0.9) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-10 px-4 pt-8 pb-14 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-12 lg:gap-12">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="hero-eyebrow font-mono-index text-xs tracking-[0.16em] text-[#59606E] uppercase">
              HYBRID R&amp;D &amp; VENTURE STUDIO · GLOBAL REMOTE
            </span>
            <span className="font-mono-index rotate-[-2deg] rounded-full bg-[#161920] px-3 py-1 text-[10.5px] font-medium tracking-[0.1em] text-[#F4F1EA] uppercase">
              No Rigid Niches
            </span>
            <span className="font-mono-index rotate-[1.5deg] rounded-full bg-[#E85427] px-3 py-1 text-[10.5px] font-medium tracking-[0.1em] text-[#FAF8F3] uppercase">
              Dual-Track Studio
            </span>
          </div>

          <h1
            aria-label="Calm systems built for operational peace and freedom to grow."
            className="mt-5 font-semibold tracking-[-0.03em] text-[#161920]"
            style={{
              fontSize: 'clamp(38px, 5.4vw, 72px)',
              lineHeight: 1.02,
            }}
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block" aria-hidden="true">
                Calm systems built for
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block" aria-hidden="true">
                <span className="font-serif-editorial font-normal text-[#E85427] italic">
                  operational peace
                </span>{' '}
                &amp; freedom
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block" aria-hidden="true">
                to grow.
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-5 max-w-[52ch] text-base leading-[1.65] text-[#4A515D] sm:text-lg">
            AksanLab partners with ambitious founders to engineer bespoke web platforms,
            spatial experiences, and practical AI — alongside an open R&amp;D laboratory
            experimenting freely across creative and technical disciplines.
          </p>

          {/* Primary Sakuga CTA + Dual Track Pills */}
          <div className="hero-cta-row mt-8 flex flex-wrap items-center gap-4">
            <SakugaBtn
              onClick={(done) => {
                done();
                setTimeout(onOpenDialogue, 180);
              }}
              ariaLabel="Start a Dialogue"
            >
              Start a Dialogue
            </SakugaBtn>

            <button
              type="button"
              onClick={() => onNavigate('studio-showcase')}
              className="min-h-[46px] rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-elevated)] px-5 text-xs font-medium tracking-[0.08em] text-[#161920] uppercase transition-colors hover:border-[#161920]"
            >
              View Studio Wall -&gt;
            </button>
          </div>

          {/* Two-Track Portal Strip */}
          <div className="hero-cta-row mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate('client-engineering')}
              className="group transition-expo flex min-w-0 flex-col justify-between rounded-xl border border-[var(--hairline-strong)] bg-[var(--surface-elevated)]/95 p-4 text-left transition-[border-color,box-shadow] duration-500 hover:border-[#161920] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427]"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-mono-index text-[10.5px] tracking-[0.12em] text-[#E85427] uppercase">
                  TRACK 01 // CLIENT WORK
                </span>
                <span className="font-mono-index transition-expo shrink-0 whitespace-nowrap text-xs text-[#59606E] transition-transform duration-500 group-hover:translate-x-1">
                  Explore -&gt;
                </span>
              </div>
              <div className="mt-2.5 text-base font-semibold text-[#161920]">
                Custom Software, Web &amp; Applied AI
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('rd-ventures')}
              className="group transition-expo flex min-w-0 flex-col justify-between rounded-xl border border-[var(--hairline-strong)] bg-[#111218] p-4 text-left text-[#F4F1EA] transition-[border-color,box-shadow] duration-500 hover:border-[#E85427] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427]"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-mono-index text-[10.5px] tracking-[0.12em] text-[#FF8A65] uppercase">
                  TRACK 02 // R&amp;D LAB
                </span>
                <span className="font-mono-index transition-expo shrink-0 whitespace-nowrap text-xs text-[#9CA3B2] transition-transform duration-500 group-hover:translate-x-1">
                  Enter Lab -&gt;
                </span>
              </div>
              <div className="mt-2.5 text-base font-semibold text-[#FAF8F3]">
                Spatial Web, Calm AI &amp; Brand Prototypes
              </div>
            </button>
          </div>
        </div>

        {/* Right Asymmetric Two26-Style Visual Specimen Stack */}
        <div className="hero-visual-stack relative min-w-0 lg:col-span-5">
          <div className="relative mx-auto max-w-[440px] lg:max-w-none">
            {/* Primary Ambient Video + Atmospheric Concrete Frame */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#161920] bg-[var(--surface-elevated)] shadow-[8px_8px_0px_rgba(232,84,39,0.22)]">
              <div className="relative aspect-[4/4.6] overflow-hidden bg-[#111218]">
                <video
                  autoPlay={!prefersReducedMotion()}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={HERO_MEDIA.mainPoster}
                  aria-label={HERO_MEDIA.mainAlt}
                  className="transition-expo h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                >
                  <source src={HERO_MEDIA.mainVideo} type="video/mp4" />
                </video>
                <span className="font-mono-index absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#111218]/75 px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-[#FAF8F3] backdrop-blur-sm uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E85427]" />
                  Motion Study 01
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--hairline)] px-4 py-2.5 sm:justify-end sm:gap-3">
                <span className="font-mono-index text-[10.5px] tracking-[0.12em] text-[#59606E] uppercase">
                  STRUCTURE &amp; LIGHT
                </span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#E85427]" />
              </div>
            </div>

            {/* Tilted Overlapping Studio Workbench Card */}
            <div className="absolute -bottom-5 -left-3 hidden w-[56%] rotate-[-2.5deg] overflow-hidden rounded-xl border-2 border-[#161920] bg-[#FAF8F3] p-1.5 shadow-[5px_6px_0px_rgba(22,25,32,0.18)] sm:block">
              <div className="aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={HERO_MEDIA.insetImage}
                  alt={HERO_MEDIA.insetAlt}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="font-mono-index px-1.5 pt-1.5 pb-0.5 text-[10px] tracking-[0.1em] text-[#161920] uppercase">
                BUILD ENVIRONMENT · CALM PACE
              </div>
            </div>

            {/* Tilted Creative Stamp Top Right */}
            <div className="font-mono-index absolute -top-3 right-3 rotate-[4deg] rounded-full border-2 border-[#161920] bg-[#FAF8F3] px-3.5 py-1 text-[10.5px] font-semibold tracking-[0.1em] text-[#161920] shadow-[3px_3px_0px_#E85427] uppercase">
              Stir Surface With Cursor
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
