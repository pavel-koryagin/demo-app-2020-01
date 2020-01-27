import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import UsersList from './UsersList';
import { usersSample } from '../qa/samples/User.samples';

storiesOf('Pages|Users', module)
  .add('List', () => (
    <StorybookPage>
      <StorybookSlot>
        <UsersList
          users={usersSample}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
