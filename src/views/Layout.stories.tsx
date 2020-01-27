import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import Layout from './Layout';

storiesOf('Widgets|Layout and Nav', module)
  .add('Layout', () => (
    <StorybookPage>
      <StorybookSlot>
        <Layout>
          Page contents go here
        </Layout>
      </StorybookSlot>
    </StorybookPage>
  ))
