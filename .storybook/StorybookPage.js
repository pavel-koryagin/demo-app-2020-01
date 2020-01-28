import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import './storybook-decorator.scss';
import { DialogsProvider } from '../src/widgets/DialogWidget';

export default function StorybookPage({
  children,
}) {
  return (
    <MemoryRouter>
      <DialogsProvider>
        <Suspense fallback="loading">
          <div className="storybook-decorator">
            {children}
          </div>
        </Suspense>
      </DialogsProvider>
    </MemoryRouter>
  );
}
