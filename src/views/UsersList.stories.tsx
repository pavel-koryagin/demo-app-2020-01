import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import UsersList from './UsersList';
import { usersSample } from '../qa/samples/User.samples';
import { PaginationStatusDto } from '../dto/PaginationDto';

const pagination: PaginationStatusDto = {
  page: 10,
  pageSize: 10,
  totalSize: 1000,
};

storiesOf('Pages|Users', module)
  .add('List', () => (
    <StorybookPage>
      <StorybookSlot>
        <UsersList
          pagination={pagination}
          users={usersSample}
          onSetPage={action('onSetPage')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
