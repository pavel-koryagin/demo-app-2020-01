import React from 'react';
import './LoaderWidget.scss';

const LoaderWidget: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__animation" />
      <div className="loader__underlay" />
    </div>
  );
};

export default LoaderWidget;
