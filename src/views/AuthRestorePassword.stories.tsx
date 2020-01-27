import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthRestorePassword from './AuthRestorePassword';

storiesOf('Pages|Auth', module)
  .add('Restore Password', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthRestorePassword
          email="alice@example.com"
        />
      </StorybookSlot>
    </StorybookPage>
  ))
