import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { similarProducts } from '../api/productApi';
import './ProductModal.css';

const ProductModal = ({ product, onClose, allProducts, onSelect }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!product) return;

    let cancelled = false;
    setLoading(true);
    setError('');
    setSimilar([]);

    similarProducts(product.title)
      .then((data) => { if (!cancelled) setSimilar(data); })
      .catch(() => {
        if (cancelled) return;
        // Local fallback based on shared category / brand
        const local = allProducts
          .filter(
            (p) =>
              p.id !== product.id &&
              (p.category === product.category || p.brand === product.brand)
          )
          .slice(0, 5)
          .map((p) => ({
            title: p.title,
            description: p.description,
            similarity: 0.75,
          }));
        setSimilar(local);
        setError(
          'Backend offline — showing locally matched products. Start Spring Boot to use semantic similarity.'
        );
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      cancelled = true;
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, allProducts, onClose]);

  if (!product) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const findLocal = (title) =>
    allProducts.find((p) => p.title.toLowerCase() === title.toLowerCase());

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal__hero">
          <img className="modal__poster" src={product.image} alt={product.title} />

          <div className="modal__copy">
            <span className="modal__eyebrow">{product.brand} · {product.category}</span>
            <h2 className="modal__title">{product.title}</h2>
            <p className="modal__desc">{product.description}</p>

            <div className="modal__pills">
              <span className="modal__pill">${product.price}</span>
              <span className="modal__pill">{product.year}</span>
              <span className="modal__pill">{product.category}</span>
            </div>
          </div>
        </div>

        <div className="modal__similar">
          <h3 className="modal__similar-title">
            Because you picked <em>{product.title}</em>
          </h3>
          <p className="modal__similar-note">
            Ranked using cosine similarity between this product's embedding and every
            other product embedding.
          </p>

          {loading && <Loading label="Comparing this product with stored vectors..." />}

          {!loading && error && (
            <div className="modal__notice">{error}</div>
          )}

          {!loading && similar.length > 0 && (
            <div className="product-grid">
              {similar.map((m) => {
                const local = findLocal(m.title);
                if (!local) return null;
                return (
                  <ProductCard
                    key={m.title}
                    product={local}
                    similarity={m.similarity}
                    onSelect={(p) => {
                      onSelect?.(p);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;