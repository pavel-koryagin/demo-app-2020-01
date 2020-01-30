import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import UserEdit from './UserEdit';
import {
  aliceAdminUserSample,
  bobManagerUserSample,
  carolRegularUserSample,
} from '../qa/samples/User.samples';
import { action } from '@storybook/addon-actions';
import { UserRole } from '../model/UserRole';

storiesOf('Pages|Users', module)
  .add('Edit', () => (
    <StorybookPage>
      <StorybookSlot>
        <UserEdit
          user={carolRegularUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          user={bobManagerUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          user={aliceAdminUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          user={{
            role: UserRole.Regular,
          }}
          onSave={action('onSave')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
