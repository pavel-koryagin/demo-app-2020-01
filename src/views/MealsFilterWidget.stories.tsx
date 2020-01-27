import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsFilterWidget from './MealsFilterWidget';
import { todayBreakfastMealSample } from '../qa/samples/Meal.samples';

storiesOf('Widgets|Meals', module)
  .add('Filter', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsFilterWidget
          meal={todayBreakfastMealSample}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
