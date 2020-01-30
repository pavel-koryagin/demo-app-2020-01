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
          profileMode={false}
          user={carolRegularUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          profileMode={true}
          user={carolRegularUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          profileMode={false}
          user={bobManagerUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          profileMode={false}
          user={aliceAdminUserSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <UserEdit
          profileMode={false}
          user={{
            role: UserRole.Regular,
          }}
          onSave={action('onSave')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
