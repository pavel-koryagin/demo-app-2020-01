import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthLogin from './AuthLogin';

storiesOf('Pages|Auth', module)
  .add('Login', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthLogin
          login={{
            email: 'alice@example.com',
            password: '123',
          }}
          onSubmit={action('onSubmit')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
