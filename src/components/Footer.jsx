import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <p>
      Product catalog is bundled locally. Semantic search and similar-product
      ranking are served by a Spring Boot + Spring AI backend. Imagery is loaded
      from Unsplash's public CDN.
    </p>
  </footer>
);

export default Footer;