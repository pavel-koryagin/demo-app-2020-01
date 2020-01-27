import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsList from './MealsList';
import {mealsSample} from "../qa/samples/Meal.samples";

storiesOf('Pages|Event Edit', module)
  .add('Default', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsList
          meals={mealsSample}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
