import React, { useState } from 'react';
import { INITIATIVES } from '../../data/studioData';
import { CategoryFilter, Initiative } from '../../types';

interface InitiativesProps {
  onSelectInitiative: (initiative: Initiative) => void;
}

export const Initiatives: React.FC<InitiativesProps> = ({ onSelectInitiative }) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredInitiatives = INITIATIVES.filter((init) => {
    if (filter === 'all') return true;
    return init.categoryType === filter;
  });

  const handleCardClick = (e: React.MouseEvent, init: Initiative) => {
    // If the user made a text selection, do not open modal
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return;
    onSelectInitiative(init);
  };

  return (
    <div id="work" className="initiatives-block">
      <div className="initiatives-header">
        <div>
          <span className="studio-panel-kicker">SELECTED INITIATIVES</span>
          <h3 className="initiatives-heading">Selected Studio Initiatives</h3>
        </div>

        <div className="filter-bar" role="group" aria-label="Filter Selected Initiatives">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All Initiatives (03)
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'PRODUCT CONCEPT' ? 'is-active' : ''}`}
            onClick={() => setFilter('PRODUCT CONCEPT')}
            aria-pressed={filter === 'PRODUCT CONCEPT'}
          >
            Product Concepts (02)
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'COMMUNITY PROJECT' ? 'is-active' : ''}`}
            onClick={() => setFilter('COMMUNITY PROJECT')}
            aria-pressed={filter === 'COMMUNITY PROJECT'}
          >
            Community Project (01)
          </button>
        </div>
      </div>

      <div className="initiatives-grid">
        {filteredInitiatives.map((init) => (
          <article
            key={init.id}
            className="initiative-card"
            data-category-type={init.categoryType}
            onClick={(e) => handleCardClick(e, init)}
          >
            <div>
              <div className="initiative-card-top">
                <span>{init.projectNumber}</span>
                <span className={`initiative-status ${init.isCommunity ? 'is-community' : ''}`}>
                  {init.status}
                </span>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div className="initiative-category">{init.category}</div>
                <h4 className="initiative-title">{init.title}</h4>
                <p className="initiative-desc">{init.desc}</p>
              </div>
            </div>

            <button
              type="button"
              className="initiative-action-btn"
              data-inspect-project={init.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectInitiative(init);
              }}
            >
              <span>Inspect Initiative Brief</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

