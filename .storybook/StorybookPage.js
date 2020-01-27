import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import './storybook-decorator.scss';

export default function StorybookPage({
  children,
}) {
  return (
    <MemoryRouter>
      <Suspense fallback="loading">
        <div className="storybook-decorator">
          {children}
        </div>
      </Suspense>
    </MemoryRouter>
  );
}
