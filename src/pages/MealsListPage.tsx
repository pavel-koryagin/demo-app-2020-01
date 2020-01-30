import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MealsList from '../views/MealsList';
import {
  deleteMeal,
  loadMeals,
  selectMealsModule,
  setFilter,
  setMealsListPage,
} from '../redux/meals.redux';
import LoaderWidget from '../widgets/LoaderWidget';
import ErrorCapsule from '../errors/ErrorCapsule';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';
import UnexpectedCaseException from '../errors/UnexpectedCaseException';
import { selectAuthUser } from '../redux/auth.redux';
import { User } from '../model/User.model';
import { UserRole } from '../model/UserRole';

const MealsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Query state
  const { list: meals, filter, pagination, caloriesPerDay } = useSelector(selectMealsModule);
  const authUser = useSelector(selectAuthUser) as User;

  // Require meals
  useEffect(() => {
    if (!meals || meals instanceof ErrorCapsule) {
      dispatch(loadMeals());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loading and errors
  if (!meals) return <LoaderWidget />;
  if (meals instanceof ErrorCapsule) return <PageLoadFailedWidget error={meals} />;

  if (!filter || !pagination || !caloriesPerDay) {
    throw new UnexpectedCaseException();
  }

  // Render
  const adminMode = authUser.role !== UserRole.Regular;
  return (
    <MealsList
      adminMode={adminMode}
      meals={meals}
      filter={filter}
      pagination={pagination}
      caloriesPerDay={caloriesPerDay}
      dailyTarget={authUser.dailyTarget || 0}
      onSetPage={value => dispatch(setMealsListPage(value))}
      onFilter={value => dispatch(setFilter(value))}
      onCreate={() => history.push('/meals/new/')}
      onDelete={id => dispatch(deleteMeal(id))}
    />
  );
};

export default MealsListPage;
