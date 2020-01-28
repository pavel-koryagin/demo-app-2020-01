import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutWidget from '../widgets/LayoutWidget';
import MealEdit from '../views/MealEdit';
import { todayBreakfastMealSample } from '../qa/samples/Meal.samples';

const MealEditPage: React.FC = () => {
  const { id } = useParams();
  const meal = todayBreakfastMealSample; // Select by id

  return (
    <LayoutWidget>
      <MealEdit
        meal={meal}
      />
    </LayoutWidget>
  );
};

export default MealEditPage;
