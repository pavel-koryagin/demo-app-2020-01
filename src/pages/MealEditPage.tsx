import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LayoutWidget from '../widgets/LayoutWidget';
import MealEdit from '../views/MealEdit';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMeal,
  loadMealToEdit,
  resetMealToEdit,
  selectMealToEdit,
  setNewMealToEdit,
  updateMeal,
} from '../redux/meals.redux';
import ErrorCapsule from '../errors/ErrorCapsule';
import LoaderWidget from '../widgets/LoaderWidget';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';
import { requireId } from '../utils/routingUtils';

function useMealEditParams() {
  const { id } = useParams();
  return {
    id: id === 'new' ? null : requireId(id),
  };
}

const MealEditPage: React.FC = () => {
  const { id } = useMealEditParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // Query state
  const meal = useSelector(selectMealToEdit);

  // Require meals
  useEffect(() => {
    if (id == null) {
      dispatch(setNewMealToEdit());
    } else if (!meal || meal instanceof ErrorCapsule || meal.id !== id) {
      dispatch(loadMealToEdit(id));
    }
    return () => { dispatch(resetMealToEdit()) };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loading and errors
  if (!meal) return <LoaderWidget />;
  if (meal instanceof ErrorCapsule) return <PageLoadFailedWidget error={meal} />;

  // Render
  return (
    <LayoutWidget>
      <MealEdit
        meal={meal}
        onSave={async meal => {
          if (meal.id == null) {
            await dispatch(createMeal(meal));
          } else {
            const { id, ...values } = meal;
            await dispatch(updateMeal(id, values));
          }
          history.push('/');
        }}
      />
    </LayoutWidget>
  );
};

export default MealEditPage;
