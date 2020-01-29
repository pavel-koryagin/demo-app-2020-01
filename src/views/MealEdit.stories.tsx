import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealEdit from './MealEdit';
import { todayBreakfastMealSample } from '../qa/samples/Meal.samples';
import { action } from '@storybook/addon-actions';

storiesOf('Pages|Meals', module)
  .add('Edit', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealEdit
          meal={todayBreakfastMealSample}
          onSave={action('onSave')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <MealEdit
          meal={{
            date: todayBreakfastMealSample.date,
            time: todayBreakfastMealSample.time,
          }}
          onSave={action('onSave')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
