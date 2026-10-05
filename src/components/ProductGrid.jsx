import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import './ProductGrid.css';

const ProductGrid = ({ products, onSelect }) => {
  if (!products.length) {
    return <EmptyState title="No products found" message="Try another category." />;
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ProductGrid;