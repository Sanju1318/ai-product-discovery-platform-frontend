import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, similarity, onSelect }) => {
  const handleClick = () => onSelect?.(product);

  return (
    <article className="product-card" onClick={handleClick} tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      role="button"
      aria-label={`Open ${product.title}`}
    >
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(135deg,#2a2a2a,#0a0a0a)';
            e.currentTarget.src = '';
          }}
        />
        <span className="product-card__category">{product.category}</span>
        <div className="product-card__overlay">
          <span className="product-card__cta">▶ Find similar</span>
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__meta">
          <span>{product.brand}</span>
          <span className="product-card__price">${product.price}</span>
        </div>

        {typeof similarity === 'number' && (
          <div className="product-card__score">
            <span className="product-card__score-bar">
              <span
                className="product-card__score-fill"
                style={{ width: `${Math.max(0, Math.min(1, similarity)) * 100}%` }}
              />
            </span>
            <span className="product-card__score-label">
              similarity {Number(similarity).toFixed(3)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;