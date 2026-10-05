import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import MatchResults from './components/MatchResults';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { semanticSearch } from './api/productApi';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState({
    loading: false,
    error: '',
    results: [],
    queryUsed: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Catalog filtered by category
  const filteredCatalog = useMemo(() => {
    if (category === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  // Semantic search
  const handleSearch = useCallback(async (q) => {
    const term = (q ?? query).trim();
    if (!term) return;

    setSearchState({ loading: true, error: '', results: [], queryUsed: term });

    try {
      const matches = await semanticSearch(term);
      setSearchState({ loading: false, error: '', results: matches, queryUsed: term });
    } catch (err) {
      // Local fallback: score by simple keyword overlap so demo still works
      const fallback = PRODUCTS.map((p) => {
        const words = term.toLowerCase().split(/\s+/);
        const haystack = (p.title + ' ' + p.description).toLowerCase();
        const hits = words.filter((w) => w.length > 2 && haystack.includes(w)).length;
        return {
          title: p.title,
          description: p.description,
          similarity: hits / Math.max(words.length, 1),
        };
      })
        .filter((m) => m.similarity > 0)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      setSearchState({
        loading: false,
        error:
          'Backend offline — showing local fallback matches. Start Spring Boot on the same origin to enable semantic search.',
        results: fallback,
        queryUsed: term,
      });
    }
  }, [query]);

  return (
    <div className="app">
      <Header />

      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      <main className="app__main">
        {searchState.results.length > 0 || searchState.loading || searchState.error ? (
          <MatchResults
            loading={searchState.loading}
            error={searchState.error}
            results={searchState.results}
            queryUsed={searchState.queryUsed}
            products={PRODUCTS}
            onSelect={setSelectedProduct}
          />
        ) : null}

        <section className="section">
          <div className="section__header">
            <div>
              <h2 className="section__title">Explore the catalog</h2>
              <p className="section__subtitle">
                Click any product to discover semantically similar items.
              </p>
            </div>
            <FilterBar
              categories={CATEGORIES}
              active={category}
              onSelect={setCategory}
            />
          </div>

          <ProductGrid
            products={filteredCatalog}
            onSelect={setSelectedProduct}
          />
        </section>
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        allProducts={PRODUCTS}
        onSelect={setSelectedProduct}
      />
    </div>
  );
};

export default App;