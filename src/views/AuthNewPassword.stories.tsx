import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import AuthNewPassword from './AuthNewPassword';

storiesOf('Pages|Auth', module)
  .add('Type New Password', () => (
    <StorybookPage>
      <StorybookSlot>
        <AuthNewPassword
          password="123"
        />
      </StorybookSlot>
    </StorybookPage>
  ))
