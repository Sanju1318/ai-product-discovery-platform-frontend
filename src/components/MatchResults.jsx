import React from 'react';
import ProductCard from './ProductCard';
import Loading from './Loading';
import EmptyState from './EmptyState';
import './MatchResults.css';

const MatchResults = ({ loading, error, results, queryUsed, products, onSelect }) => {
  const findLocal = (title) =>
    products.find((p) => p.title.toLowerCase() === title.toLowerCase());

  return (
    <section className="match-results">
      <div className="match-results__header">
        <div>
          <h2 className="match-results__title">Semantic Search Results</h2>
          <p className="match-results__subtitle">
            Searching by meaning for: <em>“{queryUsed}”</em>
          </p>
        </div>
      </div>

      {loading && <Loading label="Creating query embedding and comparing vectors..." />}

      {!loading && error && (
        <div className="match-results__error">
          <strong>Backend notice</strong>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <EmptyState title="No matches" message="Try a different description." />
      )}

      {!loading && results.length > 0 && (
        <div className="product-grid">
          {results.map((m) => {
            const local = findLocal(m.title);
            if (!local) return null;
            return (
              <ProductCard
                key={m.title}
                product={local}
                similarity={m.similarity}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MatchResults;