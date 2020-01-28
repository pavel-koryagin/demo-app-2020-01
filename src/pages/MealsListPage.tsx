import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import MealsList from '../views/MealsList';
import { mealsSample } from '../qa/samples/Meal.samples';

const MealsListPage: React.FC = () => {
  return (
    <LayoutWidget>
      <MealsList
        meals={mealsSample}
        onDelete={() => {}}
      />
    </LayoutWidget>
  );
};

export default MealsListPage;
