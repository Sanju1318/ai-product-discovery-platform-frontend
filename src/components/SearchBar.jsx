import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="search-box">
      <div className="search-box__field">
        <span className="search-box__icon" aria-hidden>🔎</span>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
          placeholder="e.g. noise cancelling headphones for travel"
          aria-label="Semantic search query"
        />
      </div>
      <button className="search-box__button" type="button" onClick={onSearch}>
        Semantic Search
      </button>
    </div>
  );
};

export default SearchBar;