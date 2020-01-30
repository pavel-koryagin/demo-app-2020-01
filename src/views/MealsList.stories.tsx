import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsList from './MealsList';
import { mealsSample } from '../qa/samples/Meal.samples';
import { noMealsFilter } from '../dto/MealsFilterDTO';

storiesOf('Pages|Meals', module)
  .add('List', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsList
          meals={mealsSample}
          filter={noMealsFilter}
          onFilter={action('onFilter')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
      <StorybookSlot height={400}>
        <MealsList
          meals={[]}
          filter={noMealsFilter}
          onFilter={action('onFilter')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
