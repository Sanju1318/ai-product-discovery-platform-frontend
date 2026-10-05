import React from 'react';
import './EmptyState.css';

const EmptyState = ({ title = 'Nothing here', message = '' }) => (
  <div className="empty-state">
    <span className="empty-state__icon" aria-hidden>📦</span>
    <h3 className="empty-state__title">{title}</h3>
    {message && <p className="empty-state__message">{message}</p>}
  </div>
);

export default EmptyState;