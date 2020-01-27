import React from 'react';
import './storybook-decorator.scss';

export default function StorybookPage({
  children,
}) {
  return (
    <div className="storybook-decorator">
      {children}
    </div>
  );
}
