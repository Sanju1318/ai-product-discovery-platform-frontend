import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, active, onSelect }) => (
  <div className="filters" role="tablist" aria-label="Filter by category">
    {categories.map((c) => (
      <button
        key={c}
        type="button"
        role="tab"
        aria-selected={active === c}
        className={`filter-button ${active === c ? 'filter-button--active' : ''}`}
        onClick={() => onSelect(c)}
      >
        {c}
      </button>
    ))}
  </div>
);

export default FilterBar;