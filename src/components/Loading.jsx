import React from 'react';
import './Loading.css';

const Loading = ({ label = 'Loading...' }) => (
  <div className="loading">
    <span className="loading__spinner" />
    {label}
  </div>
);

export default Loading;