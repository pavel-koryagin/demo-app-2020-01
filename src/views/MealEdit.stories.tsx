import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealEdit from './MealEdit';
import { todayBreakfastMealSample } from '../qa/samples/Meal.samples';

storiesOf('Pages|Meals', module)
  .add('Edit', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealEdit
          meal={todayBreakfastMealSample}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
