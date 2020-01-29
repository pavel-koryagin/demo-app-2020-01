import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsList from './MealsList';
import { mealsSample } from '../qa/samples/Meal.samples';

storiesOf('Pages|Meals', module)
  .add('List', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsList
          meals={mealsSample}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
      <StorybookSlot height={400}>
        <MealsList
          meals={[]}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
