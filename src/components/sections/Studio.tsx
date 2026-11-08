import React, { useEffect, useRef, useState } from 'react';
import { TRUST_AVATARS } from '../../data/studioData';

export const Studio: React.FC = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [servicesCount, setServicesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 900;

      if (rect.top < vh * 0.82) {
        setHasAnimated(true);

        const startTime = performance.now();
        const duration = 1300;

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          const eased = 1 - Math.pow(1 - t, 3);

          setServicesCount(Math.round(eased * 5));
          setProductsCount(Math.round(eased * 4));

          if (t < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  return (
    <div className="studio-trust-panel" id="studio-trust-panel" ref={panelRef}>
      <div className="studio-panel-left">
        <span className="studio-panel-kicker">(OUR STUDIO)</span>
        <h2 className="studio-panel-heading">
          Two engines.
          <br />
          One
          <br />
          direction.
          {/* Frosted Glass Icon Tile 1 */}
          <span className="frosted-glass-tile frosted-tile-1" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M24.5 7.5L7.5 24.5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          {/* Frosted Glass Icon Tile 2 */}
          <span className="frosted-glass-tile frosted-tile-2" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="10" cy="10" r="3" fill="currentColor" />
              <circle cx="22" cy="10" r="3" fill="currentColor" />
              <circle cx="10" cy="22" r="3" fill="currentColor" />
              <circle cx="22" cy="22" r="3" fill="#7DAFE0" />
            </svg>
          </span>
        </h2>

        <p className="studio-panel-copy">
          We combine professional technology services with independent product development, creating
          solutions that solve immediate challenges while building possibilities for the future.
        </p>
      </div>

      {/* Three Studio Cards */}
      <div className="studio-panel-cards">
        {/* Card 1: Pillar 01 Digital Services + 8 Round Avatars */}
        <article className="panel-card panel-card-services">
          <div className="avatar-grid-8" id="studio-avatars-grid" aria-hidden="true">
            {TRUST_AVATARS.map((src, index) => (
              <span
                key={index}
                className="avatar-node"
                style={{
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                  transform: hasAnimated ? 'scale(1)' : 'scale(0.4)',
                  opacity: hasAnimated ? 1 : 0,
                  transitionDelay: `${index * 55}ms`,
                }}
              >
                <img src={src} alt="" referrerPolicy="no-referrer" />
              </span>
            ))}
          </div>

          <div>
            <div className="panel-card-stat-num">
              <span>{String(servicesCount).padStart(2, '0')}</span>+
            </div>
            <div className="panel-card-stat-title">Pillar 01 — Digital Services</div>
            <p className="panel-card-stat-sub">
              Software Development, Web &amp; Mobile, AI Integration, Automation &amp; UI/UX.
            </p>
          </div>
        </article>

        {/* Card 2: Pillar 02 Digital Products + Laurel Badge */}
        <article className="panel-card panel-card-products" id="panel-card-products">
          <div>
            <div className="panel-card-stat-num">
              <span>{String(productsCount).padStart(2, '0')}</span>+
            </div>
            <div className="panel-card-stat-title">Pillar 02 — Digital Products</div>
          </div>

          <div className="laurel-badge-wrap" aria-hidden="true">
            <svg className="laurel-svg" viewBox="0 0 180 68" fill="none">
              <path
                d="M34 52C20 44 16 26 26 12M146 52C160 44 164 26 154 12"
                stroke="#7DAFE0"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <rect
                x="36"
                y="16"
                width="108"
                height="36"
                rx="18"
                stroke="rgba(255,255,255,0.28)"
              />
              <text
                x="90"
                y="32"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="8"
                fontWeight="700"
                letterSpacing="1.2"
              >
                INDEPENDENT
              </text>
              <text
                x="90"
                y="43"
                textAnchor="middle"
                fill="#7DAFE0"
                fontSize="7.5"
                fontWeight="600"
                letterSpacing="1"
              >
                PRODUCT STUDIO
              </text>
            </svg>
          </div>

          <p className="panel-card-stat-sub">
            SaaS Platforms, Business Applications, Productivity Tools &amp; AI Software.
          </p>
        </article>

        {/* Card 3: Portrait Card, cut off by panel edge */}
        <div className="panel-card panel-card-portrait" aria-hidden="true">
          <img
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/addecc7d-666f-4342-8290-ed7f7cbbffd6.webp"
            alt=""
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

