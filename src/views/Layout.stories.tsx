import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import Layout from './Layout';
import { aliceAdminUserSample, carolRegularUserSample } from '../qa/samples/User.samples';

storiesOf('Widgets|Layout and Nav', module)
  .add('Layout', () => (
    <StorybookPage>
      <StorybookSlot>
        <Layout
          user={null}
          currentUrl="/users/"
          onLogout={action('onLogout')}
        >
          Page contents go here
        </Layout>
      </StorybookSlot>
      <StorybookSlot>
        <Layout
          user={aliceAdminUserSample}
          currentUrl="/users/"
          onLogout={action('onLogout')}
        >
          Page contents go here
        </Layout>
      </StorybookSlot>
      <StorybookSlot>
        <Layout
          user={carolRegularUserSample}
          currentUrl="/users/"
          onLogout={action('onLogout')}
        >
          Page contents go here
        </Layout>
      </StorybookSlot>
    </StorybookPage>
  ))
