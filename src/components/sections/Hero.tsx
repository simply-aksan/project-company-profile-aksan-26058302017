import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import fallbackFounderPhoto from '../../assets/images/hero_founder.jpg';

// UBAH NAMA FOTO ANDA DI SINI
// Cukup letakkan foto baru di folder: public/images/nama-foto-anda.jpg
const HERO_PHOTO_PATH = '/images/hero_founder.png';

interface HeroProps {
  onOpenContact: (subject: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [directionsCount, setDirectionsCount] = useState(0);
  const [initiativesCount, setInitiativesCount] = useState(0);
  const [photoTranslateY, setPhotoTranslateY] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>(HERO_PHOTO_PATH);

  useEffect(() => {
    // Eased count up
    const startTime = performance.now();
    const duration = 1400;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      setDirectionsCount(Math.round(eased * 2));
      setInitiativesCount(Math.round(eased * 3));

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight || 900;
      if (scrollY < vh * 1.5) {
        setPhotoTranslateY(scrollY * 0.12);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero-section" aria-label="Company Introduction">
      <div className="hero-artboard">
        {/* Navigation & Contact CTA */}
        <Navbar onOpenContact={onOpenContact} />

        {/* Hero Title */}
        <div className="hero-title-group">
          <span className="hero-title-sup" data-hero-stagger>
            (RKV)
          </span>
          <h1 className="hero-title">
            <span className="title-line-mask">
              <span className="title-line-inner" data-title-line>
                BUILD
              </span>
            </span>
            <span className="title-line-mask">
              <span className="title-line-inner" data-title-line>
                WHAT&apos;S NEXT.
              </span>
            </span>
          </h1>
        </div>

        {/* About Rekavanta Box */}
        <div className="hero-about-box" data-hero-stagger>
          <div className="about-kicker">
            <span className="about-kicker-dot" aria-hidden="true" />
            <span>(ABOUT REKAVANTA)</span>
          </div>
          <p className="about-copy-primary">
            We engineer digital solutions and build independent products that turn ambitious ideas
            into meaningful technology.
          </p>
          <p className="about-copy-secondary">
            Combining software engineering, digital innovation, and intelligent technology to solve
            real-world problems.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-row" data-hero-stagger>
          <a href="#studio" className="btn-hero-dark">
            <span>Explore Our Studio</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="btn-hero-outline"
            onClick={() => onOpenContact('Start a Conversation')}
          >
            <span>Start a Conversation</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* Central Monochromatic Hero Photo + Brand Plate + Conceptual Labels */}
        <div className="hero-mobile-visual-stage">
          <div className="hero-photo-wrap" id="hero-photo-wrap">
            <img
              src={imgSrc}
              onError={() => {
                // Jika foto baru gagal dimuat / salah nama, otomatis fallback ke cadangan aman (tidak akan crash)
                if (imgSrc !== fallbackFounderPhoto) {
                  setImgSrc(fallbackFounderPhoto);
                }
              }}
              alt="Monochromatic editorial portrait of technology founder seen from behind in a technical jacket"
              className="hero-photo"
              id="hero-photo"
              style={{ transform: `translateY(${photoTranslateY.toFixed(1)}px)` }}
            />
          </div>

          {/* Dark Glass Brand Plate over the Founder's Back */}
          <div className="hero-brand-plate" id="hero-brand-plate" data-hero-stagger>
            <div className="brand-plate-left">
              <svg
                className="brand-plate-tri"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon points="12,2 2,20 11,20" fill="#FFFFFF" />
                <polygon points="13,7 13,20 22,20" fill="#7DAFE0" />
              </svg>
              <div className="brand-plate-wordmark-group">
                <span className="brand-plate-wordmark">REKAVANTA</span>
                <span className="brand-plate-sub">TECHNOLOGY &amp; PRODUCT STUDIO</span>
              </div>
            </div>
            <a
              href="#studio"
              className="brand-plate-menu-icon"
              aria-label="Jump to Studio section"
            >
              <span />
              <span />
            </a>
          </div>

          {/* Conceptual Labels across the Jacket */}
          <div className="hero-jacket-wordmarks" data-hero-stagger>
            <span>SOFTWARE</span>
            <span className="wordmark-dot" aria-hidden="true">
              ·
            </span>
            <span>PRODUCTS</span>
            <span className="wordmark-dot" aria-hidden="true">
              ·
            </span>
            <span>INTELLIGENCE</span>
          </div>
        </div>

        {/* Bottom-Left Stats Frame: Card 1 (02+) & Card 2 (03) */}
        <div className="hero-stats-frame" data-hero-stagger>
          {/* Card 1: 02+ Business Directions */}
          <div className="stat-card-dark">
            <div>
              <div className="stat-big-num">
                <span>{String(directionsCount).padStart(2, '0')}</span>+
              </div>
              <div className="stat-card-label">Business Directions</div>
            </div>

            {/* Six capability marks */}
            <div className="mini-marks-grid" aria-hidden="true">
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="3" fill="currentColor" />
                </svg>
                Software
              </span>
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <rect x="2" y="2" width="6" height="6" fill="currentColor" />
                </svg>
                Web/App
              </span>
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <polygon points="5,1 9,9 1,9" fill="currentColor" />
                </svg>
                AI Sys
              </span>
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <path d="M1 5H9M5 1V9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Auto
              </span>
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="3.5" stroke="currentColor" fill="none" />
                </svg>
                SaaS
              </span>
              <span className="mini-mark-pill">
                <svg viewBox="0 0 10 10">
                  <rect x="2" y="2" width="6" height="6" stroke="currentColor" fill="none" />
                </svg>
                UI/UX
              </span>
            </div>

            <a href="#studio" className="stat-mini-cta">
              <span>Explore Studio</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Card 2: 03 Selected Initiatives */}
          <a href="#work" className="stat-card-photo">
            <img
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a9d3641f-d629-46e5-8d2d-5f75386b803d.webp"
              alt=""
              className="stat-card-photo-bg"
              referrerPolicy="no-referrer"
            />
            <div className="stat-photo-top">
              <span>Studio Feed</span>
              <span>02/03</span>
            </div>
            <div className="stat-photo-bottom">
              <div className="stat-big-num">
                {String(initiativesCount).padStart(2, '0')}
              </div>
              <div className="stat-card-label">Selected Initiatives</div>
            </div>
          </a>
        </div>

        {/* Right Column Elements */}
        <div className="hero-frosted-pill" data-hero-stagger>
          <span className="frosted-check-disc" aria-hidden="true">
            ✓
          </span>
          <span>Build Solutions. Create Possibilities.</span>
        </div>

        <div className="hero-availability" data-hero-stagger>
          <div>Hybrid Technology</div>
          <div>
            <span className="avail-dot" aria-hidden="true" />
            Studio Model
          </div>
        </div>

        <div className="hero-feature-box" data-hero-stagger>
          <div className="feature-box-header">
            <div>
              <span className="feature-box-kicker">Selected Initiatives</span>
              <span className="feature-box-title">Huni · Personal OS · Sentul</span>
            </div>
            <span className="feature-box-year">[03]</span>
          </div>

          <a
            href="#work"
            className="feature-card-visual"
            aria-label="Explore Selected Initiatives: Huni, Personal OS, and Sentul Trekking Information System"
          >
            <img
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9340eb08-877d-4d08-91fb-b70754541d98.webp"
              alt="Abstract monochrome preview for Rekavanta Selected Initiatives"
              className="feature-card-img"
              referrerPolicy="no-referrer"
            />
            <span className="feature-frosted-arrow" aria-hidden="true">
              ↗
            </span>
            <div className="feature-progress-track" aria-hidden="true">
              <div className="feature-progress-fill" id="hero-progress-fill" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
