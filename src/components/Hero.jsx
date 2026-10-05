import React from 'react';
import SearchBar from './SearchBar';
import './Hero.css';

const Hero = ({ query, onQueryChange, onSearch }) => (
  <section className="hero">
    <div className="hero__content">
      <p className="hero__eyebrow">
        <span className="hero__eyebrow-dot" /> AI product discovery
      </p>
      <h1 className="hero__title">
        Discover products by <br />
        <span className="hero__title-gradient">intent</span>,{' '}
        not keywords.
      </h1>
      <p className="hero__copy">
        Describe what you need in plain English. Neostore embeds your sentence,
        compares it with locally stored product vectors, and returns the closest
        matches — instantly.
      </p>

      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        onSearch={() => onSearch(query)}
      />

      <p className="hero__examples">
        Try: <em>“noise cancelling headphones for travel”</em>,{' '}
        <em>“laptop for programming”</em>, or{' '}
        <em>“flagship smartphone with best camera”</em>.
      </p>
    </div>
  </section>
);

export default Hero;