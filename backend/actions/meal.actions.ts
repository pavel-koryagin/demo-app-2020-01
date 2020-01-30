import { AsyncRequestHandler } from '../assembleServer';
import { mealsSample } from '../../src/qa/samples/Meal.samples';
import MealOrm from '../model/MealOrm';
import Auth from '../utils/Auth';

export const listMealsAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireRegularUserOrAdmin();

  if (auth.isRegularUser()) {
    MealOrm.findAll({ where: { userId: auth.id }});
  }
  return MealOrm.findAll();
}

export const getMealAction: AsyncRequestHandler = async req => {
  return mealsSample[0];
}

export const createMealAction: AsyncRequestHandler = async req => {
  return mealsSample[0];
}

export const updateMealAction: AsyncRequestHandler = async req => {
  return mealsSample[0];
}

export const deleteMealAction: AsyncRequestHandler = async req => {

}
