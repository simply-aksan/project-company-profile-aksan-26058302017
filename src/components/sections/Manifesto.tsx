import React, { useEffect, useRef, useState } from 'react';
import { MANIFESTO_WORDS } from '../../data/studioData';

export const Manifesto: React.FC = () => {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!statementRef.current) return;
      const rect = statementRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const startY = vh * 0.85;
      const endY = vh * 0.15;
      const prog = (startY - rect.top) / (startY - endY);
      setProgress(Math.max(0, Math.min(1, prog)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SOFT_EDGE = 3;
  const wordCount = MANIFESTO_WORDS.length;
  const virtualPos = progress * (wordCount + SOFT_EDGE);

  return (
    <section id="manifesto" className="manifesto-section" aria-label="Company Philosophy">
      <div className="manifesto-inner">
        <div className="manifesto-kicker">(BRAND PHILOSOPHY)</div>

        <p
          id="manifesto-statement"
          ref={statementRef}
          className="manifesto-statement"
          aria-label={MANIFESTO_WORDS.join(' ')}
        >
          {MANIFESTO_WORDS.map((word, i) => {
            const f = Math.max(0, Math.min(1, (virtualPos - i) / SOFT_EDGE));
            let color = '#6f6f6f';
            if (f >= 0.999) {
              color = '#f4f4f4';
            } else if (f > 0.001) {
              const c = Math.round(111 + (244 - 111) * f);
              color = `rgb(${c},${c},${c})`;
            }

            return (
              <React.Fragment key={i}>
                <span className="manifesto-word" style={{ color }}>
                  {word}
                </span>{' '}
              </React.Fragment>
            );
          })}
        </p>

        <p className="manifesto-subline">
          From custom software solutions to independent digital products.
          <br />
          <em>Engineered with purpose. Built to evolve.</em>
        </p>

        <div className="manifesto-pillars-strip" role="list" aria-label="Philosophy Labels">
          <span role="listitem">ENGINEERING</span>
          <span className="pillar-dot" aria-hidden="true">
            ·
          </span>
          <span role="listitem">INNOVATION</span>
          <span className="pillar-dot" aria-hidden="true">
            ·
          </span>
          <span role="listitem">IMPACT</span>
        </div>
      </div>
    </section>
  );
};

