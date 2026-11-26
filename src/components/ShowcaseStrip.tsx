import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STRIP_SPECIMENS, type StripSpecimen } from '../data/aksanContent';
import { prefersReducedMotion } from '../lib/gsap';

interface ShowcaseStripProps {
  onSelectSpecimen?: (specimen: StripSpecimen) => void;
}

const LOOP_ITEMS = [...STRIP_SPECIMENS, ...STRIP_SPECIMENS];

export function ShowcaseStrip({ onSelectSpecimen }: ShowcaseStripProps) {
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !prefersReducedMotion()) return;

    const videos = el.querySelectorAll('video');
    videos.forEach((video) => {
      video.pause();
    });
  }, []);

  return (
    <section
      id="studio-showcase"
      ref={stripRef}
      aria-label="AksanLab studio wall showcase"
      className="relative overflow-hidden bg-[#F7ECE6] pt-6 pb-20 lg:pt-10 lg:pb-24"
    >
      {/* Editorial micro-header above the flowing specimen stream */}
      <div className="aksan-container mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#B8431B] uppercase">
            01 — Living Studio Wall
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-[#111218] sm:text-3xl lg:text-4xl">
            Quiet mechanics, spatial clarity, real motion.
          </h2>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-[#524C44] sm:text-sm">
          A continuous reel of spatial interfaces, tactile motion studies, and structured software
          studies. Hover to pause; select any frame to start a build conversation.
        </p>
      </div>

      {/* Seamless looping borderless horizontal showcase strip */}
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F7ECE6] to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F7ECE6] to-transparent sm:w-16"
        />

        <div className="aksan-strip-track gap-4 px-4 sm:gap-6 sm:px-6">
          {LOOP_ITEMS.map((item, idx) => {
            const isClone = idx >= STRIP_SPECIMENS.length;
            return (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                tabIndex={isClone ? -1 : 0}
                aria-hidden={isClone}
                onClick={() => onSelectSpecimen?.(item)}
                className="group relative flex w-[264px] shrink-0 flex-col overflow-hidden rounded-[24px] p-3 text-left transition-transform duration-300 hover:-translate-y-1.5 sm:w-[340px] sm:p-3.5 lg:w-[410px] 2xl:w-[460px]"
                style={{ backgroundColor: item.toneBg }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[#111218]">
                  {item.mediaType === 'video' ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={item.posterSrc}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    >
                      <source src={item.mediaSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.mediaSrc}
                      alt={item.mediaAlt}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}

                  {/* Minimal floating corner action chip */}
                  <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111218] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-3 px-1.5 pb-1">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[#111218]/65 uppercase">
                      {item.label}
                    </p>
                    <p className="truncate font-display text-sm font-bold tracking-tight text-[#111218] sm:text-base">
                      {item.title}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] font-semibold text-[#111218]/50 uppercase">
                    {item.mediaType === 'video' ? 'Motion' : 'Study'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
