import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header__brand">
      <span className="header__mark">◆</span>
      <span className="header__name">NEO</span>
      <span className="header__name header__name--accent">STORE</span>
    </div>
    <div className="header__status">
      <span className="header__dot" />
      AI-powered product discovery · live
    </div>
  </header>
);

export default Header;