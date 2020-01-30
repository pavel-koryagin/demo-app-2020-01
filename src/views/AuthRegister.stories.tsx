import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthRegister from './AuthRegister';
import { action } from '@storybook/addon-actions';

storiesOf('Pages|Auth', module)
  .add('Register', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthRegister
          register={{
            email: 'alice@example.com',
            firstName: '',
            lastName: '',
            password: '123',
            confirmPassword: '123',
          }}
          onSubmit={action('onSubmit')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
