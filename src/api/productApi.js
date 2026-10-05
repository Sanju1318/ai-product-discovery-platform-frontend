const API_BASE = '/products';

/**
 * Search products using user query.
 * Backend: GET /products/search?query=...
 */
export async function semanticSearch(query) {
  const url = `${API_BASE}/search?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Backend returned HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Find similar products for a given title.
 * Backend: GET /products/similar/{title}
 */
export async function similarProducts(title) {
  const url = `${API_BASE}/similar/${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Backend returned HTTP ${res.status}`);
  }
  return res.json();
}