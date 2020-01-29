import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LayoutWidget from '../widgets/LayoutWidget';
import MealsList from '../views/MealsList';
import { deleteMeal, loadMeals, selectAllMeals } from '../redux/meals.redux';
import LoaderWidget from '../widgets/LoaderWidget';
import ErrorCapsule from '../errors/ErrorCapsule';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';

const MealsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Query state
  const meals = useSelector(selectAllMeals);

  // Require meals
  useEffect(() => {
    if (!meals || meals instanceof ErrorCapsule) {
      dispatch(loadMeals());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loading and errors
  if (!meals) return <LoaderWidget />;
  if (meals instanceof ErrorCapsule) return <PageLoadFailedWidget error={meals} />;

  // Render
  return (
    <LayoutWidget>
      <MealsList
        meals={meals}
        onCreate={() => history.push('/meals/new/')}
        onDelete={id => dispatch(deleteMeal(id))}
      />
    </LayoutWidget>
  );
};

export default MealsListPage;
