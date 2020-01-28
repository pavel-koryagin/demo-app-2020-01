import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutWidget from '../widgets/LayoutWidget';
import MealsList from '../views/MealsList';
import { loadMeals, selectAllMeals } from '../redux/meals.redux';
import LoaderWidget from '../widgets/LoaderWidget';
import ErrorCapsule from '../errors/ErrorCapsule';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';

const MealsListPage: React.FC = () => {
  const dispatch = useDispatch();

  // Query state
  const meals = useSelector(selectAllMeals);

  // Require meals
  useEffect(() => {
    if (!meals || meals instanceof ErrorCapsule) {
      dispatch(loadMeals());
    }
  }, []);

  // Render loading and errors
  if (!meals) return <LoaderWidget />;
  if (meals instanceof ErrorCapsule) return <PageLoadFailedWidget error={meals} />;

  // Render
  return (
    <LayoutWidget>
      <MealsList
        meals={meals}
        onDelete={() => dispatch(() => {})}
      />
    </LayoutWidget>
  );
};

export default MealsListPage;
