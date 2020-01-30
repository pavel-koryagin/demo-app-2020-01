import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsListFilter from './MealsListFilter';
import { todayBreakfastMealSample } from '../qa/samples/Meal.samples';
import { action } from '@storybook/addon-actions';

storiesOf('Pages|Meals', module)
  .add('List / Filter', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsListFilter
          dateStart={null}
          dateEnd={null}
          timeStart={null}
          timeEnd={null}
          onChange={action('onChange')}
        />
      </StorybookSlot>
      <StorybookSlot>
        <MealsListFilter
          dateStart="2020-01-27"
          dateEnd="2020-01-28"
          timeStart="10:00"
          timeEnd="16:00"
          onChange={action('onChange')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
