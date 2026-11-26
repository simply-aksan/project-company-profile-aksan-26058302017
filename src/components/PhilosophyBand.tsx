import { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import {
  CONTACT_CONFIG,
  FAQ_ENTRIES,
  PortalSectionId,
  STACK_PRINCIPLES,
} from '../data/aksanContent';
import { SakugaBtn } from './SakugaControl';

interface PhilosophyBandProps {
  onOpenDialogue: () => void;
  onNavigate?: (id: PortalSectionId) => void;
}

export function PhilosophyBand({
  onOpenDialogue,
  onNavigate,
}: PhilosophyBandProps) {
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleNextCard = () => {
    setActiveCardIdx((prev) => (prev + 1) % STACK_PRINCIPLES.length);
  };

  const handlePrevCard = () => {
    setActiveCardIdx(
      (prev) => (prev - 1 + STACK_PRINCIPLES.length) % STACK_PRINCIPLES.length
    );
  };

  return (
    <div className="relative">
      {/* BAND A: Solid Terracotta Interactive Principle Card Stack */}
      <section
        aria-label="Operating philosophy deck"
        className="relative overflow-hidden bg-[#E85427] py-20 text-[#FAF8F3] sm:py-28"
      >
        {/* Subtle Translucent Architectural Loop Accent */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 520"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        >
          <path
            d="M -100 440 C 260 120, 620 510, 960 220 C 1200 10, 1380 280, 1540 120"
            stroke="#FAF8F3"
            strokeWidth="36"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-12 px-4 sm:px-8 lg:grid-cols-12">
          {/* Left Manifesto Headline */}
          <div className="lg:col-span-5">
            <span className="font-mono-index inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-[11px] font-medium tracking-[0.16em] text-white uppercase">
              04 // STUDIO CONVICTIONS
            </span>

            <h2
              className="mt-5 font-display font-bold tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.03 }}
            >
              Freedom of direction requires{' '}
              <span className="font-serif-editorial font-normal italic text-[#FFF3D6]">
                clarity of structure.
              </span>
            </h2>

            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-white/90">
              Four engineering convictions that govern every client engagement and internal R&amp;D
              experiment we build inside AksanLab.
            </p>

            {/* Deck Controls + Progress Indicator */}
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevCard}
                aria-label="Previous conviction card"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#161920] bg-white text-[#161920] shadow-[3px_3px_0px_#161920] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextCard}
                aria-label="Next conviction card"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#161920] bg-white text-[#161920] shadow-[3px_3px_0px_#161920] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="font-mono-index ml-2 text-xs font-semibold tracking-[0.16em] text-white/90 uppercase">
                0{activeCardIdx + 1} / 0{STACK_PRINCIPLES.length}
              </span>
            </div>
          </div>

          {/* Right Interactive Stacked White Tilted Cards */}
          <div className="flex items-center gap-4 sm:gap-6 lg:col-span-7 lg:justify-end">
            <div className="relative h-[320px] w-full max-w-[540px] sm:h-[300px]">
              {STACK_PRINCIPLES.map((item, idx) => {
                const offset =
                  (idx - activeCardIdx + STACK_PRINCIPLES.length) %
                  STACK_PRINCIPLES.length;
                const isFront = offset === 0;
                const rotations = [0, -3.2, 2.4, -4.5];
                const rot = rotations[offset] ?? 0;
                const translateY = offset * 10;
                const translateX = offset * 8;
                const scale = 1 - offset * 0.035;
                const zIndex = STACK_PRINCIPLES.length - offset;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={isFront ? handleNextCard : () => setActiveCardIdx(idx)}
                    aria-label={`Principle ${item.code}: ${item.title}`}
                    style={{
                      transform: `translate(${translateX}px, ${translateY}px) rotate(${rot}deg) scale(${scale})`,
                      zIndex,
                    }}
                    className={`absolute inset-0 flex flex-col justify-between rounded-[24px] border-2 border-[#161920] bg-[#FAF8F3] p-6 text-left text-[#161920] shadow-[8px_8px_0px_rgba(22,25,32,0.28)] transition-[transform,opacity] duration-500 sm:p-8 ${
                      isFront ? 'cursor-pointer opacity-100' : 'opacity-90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono-index text-xs font-semibold tracking-[0.16em] text-[#E85427] uppercase">
                        {item.code} // PRINCIPLE
                      </span>
                      <span className="font-mono-index rounded-full border border-[#161920]/20 bg-[#F7ECE6] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[#161920] uppercase">
                        {item.tag}
                      </span>
                    </div>

                    <div className="my-auto py-3">
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#161920] sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4A515D] sm:text-base">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[var(--hairline)] pt-3.5 text-xs">
                      <span className="font-mono-index font-semibold tracking-[0.08em] text-[#161920] uppercase">
                        {item.role}
                      </span>
                      <span className="font-mono-index text-[#B8431B] uppercase">
                        Tap Card -&gt;
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Vertical Dot Progress Indicator */}
            <div
              className="hidden flex-col gap-2.5 sm:flex"
              role="tablist"
              aria-label="Conviction card selector"
            >
              {STACK_PRINCIPLES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeCardIdx}
                  aria-label={`Select conviction ${idx + 1}`}
                  onClick={() => setActiveCardIdx(idx)}
                  className={`w-2.5 rounded-full transition-all duration-300 ${
                    idx === activeCardIdx
                      ? 'h-8 bg-white'
                      : 'h-2.5 bg-white/40 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BAND B: Interactive FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-24 bg-[#F7ECE6] py-20 text-[#161920] sm:py-28"
      >
        <div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-12">
          {/* Left Sticky Title & Geometric Studio Badge */}
          <div className="lg:col-span-5">
            <span className="font-mono-index text-xs tracking-[0.16em] text-[#B8431B] uppercase">
              05 // STRAIGHT ANSWERS
            </span>
            <h2
              className="mt-4 font-display font-bold tracking-[-0.03em] text-[#161920] uppercase"
              style={{ fontSize: 'clamp(34px, 4.2vw, 52px)', lineHeight: 0.98 }}
            >
              Things you
              <br />
              might ask.
            </h2>

            <div className="mt-6 flex items-center gap-4">
              {/* Crisp Optical Geometry Studio Emblem (Zero emojis) */}
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <circle cx="34" cy="34" r="31" stroke="#161920" strokeWidth="2" />
                <circle cx="34" cy="34" r="18" stroke="#E85427" strokeWidth="2" strokeDasharray="5 4" />
                <rect
                  x="27"
                  y="27"
                  width="14"
                  height="14"
                  rx="3"
                  transform="rotate(45 34 34)"
                  fill="#E85427"
                />
              </svg>
              <span className="font-mono-index rotate-[-2deg] rounded-full border-2 border-[#161920] bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#161920] shadow-[3px_3px_0px_#E85427] uppercase">
                No fluff, clear scope
              </span>
            </div>
          </div>

          {/* Right Expandable Accordion Rows */}
          <div className="space-y-3.5 lg:col-span-7">
            {FAQ_ENTRIES.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border-2 border-[#161920] bg-[#FAF8F3] shadow-[4px_4px_0px_rgba(22,25,32,0.08)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427]"
                  >
                    <span className="font-display text-base font-bold tracking-tight text-[#161920] sm:text-lg">
                      {item.q}
                    </span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#161920] bg-[#F7ECE6] text-[#161920]">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--hairline)] px-5 pt-3 pb-5 text-sm leading-relaxed text-[#4A515D] sm:px-6 sm:text-base">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BAND C: Monumental Full-Bleed Terracotta Closing Footer */}
      <footer className="relative overflow-hidden bg-[#E85427] pt-20 text-white sm:pt-24">
        {/* Soft Translucent Curve Lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 420"
          fill="none"
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-20"
        >
          <path
            d="M -120 340 Q 460 40 940 280 T 1560 90"
            stroke="#FFFFFF"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <circle cx="1180" cy="110" r="140" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1220px] px-4 sm:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-white/25 pb-14 lg:flex-row lg:items-end">
            <div className="max-w-[660px]">
              <span className="font-mono-index text-xs tracking-[0.18em] text-[#FFF3D6] uppercase">
                06 // CLOSING DIALOGUE
              </span>
              <h2
                className="mt-3 font-display font-bold tracking-[-0.03em] text-white"
                style={{ fontSize: 'clamp(34px, 4.8vw, 62px)', lineHeight: 1.02 }}
              >
                Okay, that&apos;s enough scrolling.{' '}
                <span className="font-serif-editorial font-normal italic text-[#FFF3D6]">
                  Let&apos;s build with calm intent.
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <SakugaBtn
                variant="secondary"
                onClick={(done) => {
                  done();
                  setTimeout(onOpenDialogue, 180);
                }}
                ariaLabel="Start a Dialogue"
              >
                Start a Dialogue
              </SakugaBtn>

              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="flex min-h-[48px] items-center justify-center rounded-full border-2 border-[#161920] bg-white px-6 text-xs font-semibold tracking-[0.06em] text-[#161920] shadow-[4px_4px_0px_#161920] transition-transform hover:-translate-y-0.5"
              >
                {CONTACT_CONFIG.email}
              </a>
            </div>
          </div>

          {/* Grounded 3-Column Studio Meta Links */}
          <div className="grid grid-cols-1 gap-8 py-12 text-sm sm:grid-cols-3">
            <div>
              <p className="font-mono-index text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                STUDIO IDENTITY
              </p>
              <p className="mt-2.5 leading-relaxed text-white/95">
                {CONTACT_CONFIG.brandName} · {CONTACT_CONFIG.locationNote}
              </p>
              <p className="mt-1 text-xs text-white/75">
                Client Software Engineering &amp; Independent R&amp;D Lab.
              </p>
            </div>

            <div>
              <p className="font-mono-index text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                EXPLORE SECTIONS
              </p>
              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white">
                <a
                  href="#studio-showcase"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('studio-showcase');
                  }}
                  className="underline-offset-4 hover:underline"
                >
                  Studio Wall
                </a>
                <a
                  href="#client-engineering"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('client-engineering');
                  }}
                  className="underline-offset-4 hover:underline"
                >
                  Client Engineering
                </a>
                <a
                  href="#rd-ventures"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('rd-ventures');
                  }}
                  className="underline-offset-4 hover:underline"
                >
                  R&amp;D Lab
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('faq');
                  }}
                  className="underline-offset-4 hover:underline"
                >
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono-index text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                MEDIA PROVENANCE
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-white/85">
                &copy; {new Date().getFullYear()} {CONTACT_CONFIG.brandName}. Architectural visuals
                curated under Unsplash Open License &amp; Mixkit Free License.
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Giant Display Wordmark Anchoring Bottom Edge */}
        <div
          aria-hidden="true"
          className="relative z-10 w-full overflow-hidden border-t border-white/15 pt-4 select-none"
        >
          <div className="mx-auto text-center font-display text-[17vw] leading-[0.82] font-extrabold tracking-[-0.04em] text-[#FAF8F3] uppercase">
            AKSAN LAB
          </div>
        </div>
      </footer>
    </div>
  );
}
