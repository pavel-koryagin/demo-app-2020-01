import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StorybookPage from '../../.storybook/StorybookPage';
import StorybookSlot from '../../.storybook/StorybookSlot';
import MealsList from './MealsList';
import { mealsSample } from '../qa/samples/Meal.samples';
import { noMealsFilter } from '../dto/MealsFilterDto';
import { PaginationStatusDto } from '../dto/PaginationDto';

const pagination: PaginationStatusDto = {
  page: 10,
  pageSize: 10,
  totalSize: 1000,
};

storiesOf('Pages|Meals', module)
  .add('List', () => (
    <StorybookPage>
      <StorybookSlot>
        <MealsList
          meals={mealsSample}
          filter={noMealsFilter}
          pagination={pagination}
          onSetPage={action('onSetPage')}
          onFilter={action('onFilter')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
      <StorybookSlot height={400}>
        <MealsList
          meals={[]}
          filter={noMealsFilter}
          pagination={pagination}
          onSetPage={action('onSetPage')}
          onFilter={action('onFilter')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
      <StorybookSlot width={500}>
        <MealsList
          meals={mealsSample}
          filter={noMealsFilter}
          pagination={pagination}
          onSetPage={action('onSetPage')}
          onFilter={action('onFilter')}
          onCreate={action('onCreate')}
          onDelete={action('onDelete')}
        />
      </StorybookSlot>
    </StorybookPage>
  ))
