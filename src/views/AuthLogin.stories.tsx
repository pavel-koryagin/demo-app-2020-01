import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthLogin from './AuthLogin';

storiesOf('Pages|Auth', module)
  .add('Login', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthLogin
          email="alice@example.com"
          password="123"
        />
      </StorybookSlot>
    </StorybookPage>
  ))
