import { useEffect, useRef, useState } from 'react';
import { VENTURE_TRACKS, VentureResearchTrack } from '../data/aksanContent';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import type { SakugaToastElement } from '../types/sakuga';
import {
  SakugaBtn,
  SakugaSliderControl,
  SakugaTabsControl,
  SakugaToggleControl,
} from './SakugaControl';

interface VenturesSectionProps {
  onCollaborateTrack: (trackTitle: string) => void;
}

const TRACK_HORIZON_GLOW: Record<string, string> = {
  'spatial-interactive-web': 'rgba(232, 84, 39, 0.24)',
  'calm-ai-systems': 'rgba(130, 178, 154, 0.22)',
  'next-gen-digital-brands': 'rgba(176, 134, 240, 0.22)',
};

export function VenturesSection({ onCollaborateTrack }: VenturesSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [kineticSurge, setKineticSurge] = useState<boolean>(true);
  const [momentum, setMomentum] = useState<number>(64);

  const dossierBodyRef = useRef<HTMLDivElement>(null);
  const labToastRef = useRef<SakugaToastElement>(null);

  const activeTrack: VentureResearchTrack =
    VENTURE_TRACKS[selectedIdx] ?? VENTURE_TRACKS[0];
  const glowColor =
    TRACK_HORIZON_GLOW[activeTrack.id] ?? TRACK_HORIZON_GLOW['spatial-interactive-web'];

  useEffect(() => {
    if (prefersReducedMotion() || !dossierBodyRef.current) return;
    gsap.fromTo(
      dossierBodyRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.72, ease: 'power4.out', overwrite: 'auto' }
    );
  }, [selectedIdx]);

  const tabOptions = VENTURE_TRACKS.map((t) => ({
    value: t.id,
    label: `${t.code} · ${t.title.split(' ')[0]}`,
  }));

  const auraScale = kineticSurge ? 0.85 + (momentum / 100) * 0.45 : 0.72;

  return (
    <section
      id="rd-ventures"
      className="aksan-obsidian-lab relative scroll-mt-4 overflow-hidden border-b border-white/10 bg-[#111218] pt-20 pb-20 text-[#F4F1EA] sm:pt-24 sm:pb-28"
    >
      {/* Cyera-Inspired Atmospheric Nocturnal Glow Scaled by Sakuga Controls */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-all duration-[1200ms]"
        style={{
          transitionTimingFunction: 'var(--ease-expo)',
          transform: `scale(${auraScale})`,
          background: `radial-gradient(ellipse 68% 58% at 70% 52%, ${glowColor} 0%, transparent 72%)`,
        }}
      />

      <div className="aksan-container relative z-10">
        {/* Top Lab Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[640px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-index text-xs tracking-[0.16em] text-[#FF7849] uppercase">
                02 // R&amp;D VENTURES LABORATORY
              </span>
              <span className="font-mono-index rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] tracking-[0.1em] text-[#D1D5DB] uppercase">
                Sakuga Kinetic Sandbox Live
              </span>
            </div>

            <h2
              className="mt-4 font-semibold tracking-[-0.025em] text-[#FAF8F3]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 48px)', lineHeight: 1.08 }}
            >
              An open laboratory unbound to a single niche.
            </h2>
          </div>

          <p className="max-w-[44ch] text-base leading-relaxed text-[#B4BBC7]">
            Here we test spatial motion, calm AI utilities, and tactile anime physics live.
            Switch tracks or test the interactive controls below to feel our laboratory
            temperament firsthand.
          </p>
        </div>

        {/* Playful Sakuga Tabs Row */}
        <div className="mt-10 max-w-full overflow-x-auto pt-4 pb-2">
          <SakugaTabsControl
            label="R&D venture tracks"
            options={tabOptions}
            selectedIndex={selectedIdx}
            onSelectIndex={setSelectedIdx}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-12">
          {/* Left Column: Selectable Track List + Sakuga Experimental Kinetic Bench */}
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
            <div className="flex flex-col gap-3">
              {VENTURE_TRACKS.map((track, idx) => {
                const selected = idx === selectedIdx;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`transition-expo flex min-h-[88px] flex-col justify-between rounded-xl border p-4.5 text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7849] ${
                      selected
                        ? 'border-[#FF7849] bg-[#1B1D28] shadow-[4px_4px_0px_rgba(232,84,39,0.28)]'
                        : 'border-white/12 bg-[#161822]/75 hover:border-white/30 hover:bg-[#1B1D28]/90'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span
                        className={`font-mono-index text-[10.5px] tracking-[0.14em] uppercase ${
                          selected ? 'text-[#FF7849]' : 'text-[#9CA3B2]'
                        }`}
                      >
                        {track.code} · {track.status}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${
                          selected ? 'bg-[#FF7849]' : 'bg-white/25'
                        }`}
                      />
                    </div>
                    <div className="mt-2 text-lg font-medium text-[#FAF8F3]">{track.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Sakuga-VFX Controls Bench */}
            <div className="rounded-2xl border border-white/15 bg-[#171923]/95 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono-index text-[11px] tracking-[0.14em] text-[#FF7849] uppercase">
                  KINETIC BENCH // SAKUGA-VFX
                </span>
                <span className="font-mono-index text-[11px] text-[#9CA3B2]">
                  {kineticSurge ? 'SURGE ON' : 'STILL'} · {momentum}%
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-[#FAF8F3]">Field Surge Mode</div>
                  <p className="text-xs text-[#9CA3B2]">
                    43-frame splash switch driving atmospheric bloom.
                  </p>
                </div>
                <div className="shrink-0">
                  <SakugaToggleControl
                    label="Field surge mode"
                    checked={kineticSurge}
                    onChange={setKineticSurge}
                  />
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-[#FAF8F3]">
                  <span>Lab Momentum</span>
                  <span className="font-mono-index text-xs text-[#FF7849]">{momentum}%</span>
                </div>
                <SakugaSliderControl
                  label="Lab Momentum"
                  value={momentum}
                  min={10}
                  max={100}
                  unit="%"
                  onChange={setMomentum}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <span className="text-xs text-[#9CA3B2]">Test kinetic impact</span>
                <SakugaBtn
                  onClick={(done) => {
                    done();
                    labToastRef.current?.show(`${activeTrack.code} · ${momentum}% calibrated`);
                  }}
                  ariaLabel="Trigger lab pulse"
                >
                  Pulse Bench
                </SakugaBtn>
              </div>
            </div>
          </div>

          {/* Right Column: Active R&D Visual Dossier */}
          <div className="flex min-w-0 flex-col justify-between lg:col-span-7">
            <div
              role="tabpanel"
              aria-label={activeTrack.title}
              className="flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#171923]/95 shadow-2xl"
            >
              <div ref={dossierBodyRef}>
                {/* Conceptual Art / Ambient Motion Specimen Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                  {activeTrack.videoSrc ? (
                    <video
                      key={activeTrack.videoSrc}
                      autoPlay={!prefersReducedMotion()}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={activeTrack.image}
                      aria-label={activeTrack.imageAlt}
                      className="h-full w-full object-cover"
                    >
                      <source src={activeTrack.videoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={activeTrack.image}
                      alt={activeTrack.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(17,18,24,0.15) 0%, rgba(23,25,35,0.92) 100%)',
                    }}
                  />
                  <div className="absolute right-5 bottom-4 left-5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-index text-xs tracking-[0.14em] text-[#FF8A65] uppercase">
                      {activeTrack.code} // {activeTrack.domain}
                    </span>
                    <span className="font-mono-index rounded-full border border-[#FF7849]/40 bg-[#FF7849]/15 px-3 py-1 text-[10.5px] tracking-[0.1em] text-[#FF8A65] uppercase">
                      {activeTrack.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-[-0.015em] text-[#FAF8F3] sm:text-3xl">
                    {activeTrack.title}
                  </h3>

                  <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-[#C2C7D1]">
                    {activeTrack.thesis}
                  </p>

                  <blockquote className="mt-6 border-l-2 border-[#FF7849] pl-4">
                    <div className="font-mono-index text-[10px] tracking-[0.14em] text-[#9CA3B2] uppercase">
                      Guiding Inquiry
                    </div>
                    <p className="font-serif-editorial mt-1 text-xl leading-snug text-[#FAF8F3] italic sm:text-2xl">
                      &ldquo;{activeTrack.question}&rdquo;
                    </p>
                  </blockquote>

                  <div className="mt-6">
                    <div className="font-mono-index text-[11px] tracking-[0.14em] text-[#9CA3B2] uppercase">
                      Current Exploration Scope
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {activeTrack.focusAreas.map((focus) => (
                        <li
                          key={focus}
                          className="flex items-start gap-2.5 text-sm text-[#E7E9EE] sm:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7849]"
                          />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-5 sm:px-8">
                <span className="text-sm text-[#9CA3B2]">
                  Open to co-builders, pilot partners, and applied R&amp;D briefs.
                </span>
                <SakugaBtn
                  variant="secondary"
                  onClick={() => onCollaborateTrack(activeTrack.title)}
                  ariaLabel="Discuss This Track"
                >
                  Discuss This Track
                </SakugaBtn>
              </div>
            </div>

            {/* Cyera-Inspired Dotted Orbital Progress Stepper */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {VENTURE_TRACKS.map((track, idx) => {
                const isCurrent = idx === selectedIdx;
                return (
                  <div key={track.id} className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Select ${track.title}`}
                      onClick={() => setSelectedIdx(idx)}
                      className="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7849]"
                    >
                      <span
                        className={`transition-expo flex items-center justify-center rounded-full border transition-all duration-500 ${
                          isCurrent
                            ? 'h-6 w-6 border-[#FAF8F3] bg-[#1B1D28]'
                            : 'h-3.5 w-3.5 border-dashed border-white/35 hover:border-white'
                        }`}
                      >
                        {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-[#FF7849]" />}
                      </span>
                    </button>
                    {idx < VENTURE_TRACKS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="h-px w-8 border-t border-dashed border-white/25"
                      />
                    )}
                  </div>
                );
              })}
              <span className="font-mono-index ml-2 text-[11px] tracking-[0.12em] text-[#9CA3B2]">
                0{selectedIdx + 1} / 0{VENTURE_TRACKS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sakuga Toast Positioned Cleanly Inside Bottom-Left Viewport */}
      <sakuga-toast
        ref={labToastRef}
        duration="2.6"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          maxWidth: 'calc(100vw - 32px)',
          zIndex: 60,
        }}
      />
    </section>
  );
}
