import { Meal } from '../../model/Meal.model';

const aliceUserId = 1;

const genericMeal = {
  id: null,
  userId: aliceUserId,
  date: '2020-01-27',
  time: '09:00',
  contents: 'Breakfast\nCereal\nbread\nmilk',
  calories: 450,
};

export const yesterdayBreakfastMealSample: Meal = {
  ...genericMeal,
  id: 1,
};

export const yesterdayLunchMealSample: Meal = {
  ...genericMeal,
  id: 2,
  time: '13:00',
  contents: 'Lunch\nPizza',
  calories: 800,
};

export const yesterdayDinnerMealSample: Meal = {
  ...genericMeal,
  id: 2,
  time: '18:00',
  contents: 'Dinner\nSusi\nJuice',
};

export const todayBreakfastMealSample: Meal = {
  ...genericMeal,
  id: 1,
};

export const todayLunchMealSample: Meal = {
  ...genericMeal,
  id: 1,
  contents: 'Lunch\nCowboy Ribeye steak\nJuice',
  calories: 2000,
};

export const mealsSample = [
  yesterdayBreakfastMealSample,
  yesterdayLunchMealSample,
  yesterdayDinnerMealSample,
  todayBreakfastMealSample,
  todayLunchMealSample
];
