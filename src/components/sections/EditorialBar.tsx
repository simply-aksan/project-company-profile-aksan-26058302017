import React from 'react';

export const EditorialBar: React.FC = () => {
  return (
    <div className="editorial-bar">
      <div className="editorial-bar-inner">
        <div>
          REKAVANTA <span className="bar-muted">STUDIO</span>
        </div>
        <a href="#manifesto" className="bar-scroll-trigger">
          <span>SCROLL DOWN</span>
          <span className="bar-scroll-disc" aria-hidden="true">
            ↓
          </span>
        </a>
        <div className="bar-muted bar-right-label">
          BUILD SOLUTIONS · CREATE POSSIBILITIES
        </div>
      </div>
    </div>
  );
};

