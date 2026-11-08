import React from 'react';
import { PILLARS } from '../../data/studioData';

export const Capabilities: React.FC = () => {
  return (
    <div className="pillars-detail-grid">
      {PILLARS.map((pillar) => (
        <article key={pillar.id} className="pillar-detail-box" id={pillar.id}>
          <div>
            <div className="pillar-detail-top">
              <span>{pillar.pillarNum}</span>
              <span className="accent-tag">{pillar.directionTag}</span>
            </div>
            <h3 className="pillar-detail-title">{pillar.title}</h3>
            <p className="pillar-detail-desc">{pillar.desc}</p>
          </div>

          <ul className="capability-tags-list" aria-label={`${pillar.title} Capabilities`}>
            {pillar.capabilities.map((cap) => (
              <li key={cap.index}>
                <span className="cap-idx">{cap.index}</span>
                {cap.label}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

