import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import UserEdit from './UserEdit';
import { carolRegularUserSample } from '../qa/samples/User.samples';

storiesOf('Pages|Users', module)
  .add('Edit', () => (
    <StorybookPage>
      <StorybookSlot>
        <UserEdit
          user={carolRegularUserSample}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
