import { AsyncRequestHandler } from '../assembleServer';
import { mealsSample } from '../../src/qa/samples/Meal.samples';

export const listMealsAction: AsyncRequestHandler = async req => {
  return mealsSample;
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
