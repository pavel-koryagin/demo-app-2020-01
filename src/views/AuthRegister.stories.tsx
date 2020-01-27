import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthRegister from './AuthRegister';

storiesOf('Pages|Auth', module)
  .add('Register', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthRegister
          email="alice@example.com"
          password="123"
        />
      </StorybookSlot>
    </StorybookPage>
  ))
