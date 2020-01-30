import { Meal } from '../../model/Meal.model';

const carolRegularUserId = 3;
const danRegularUserId = 4;

const genericMeal = {
  id: null,
  userId: carolRegularUserId,
  date: '2020-01-27',
  time: '09:00',
  contents: 'Breakfast\nCereal\nBread\nMilk',
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
  id: 3,
  time: '18:00',
  contents: 'Dinner\nSusi\nJuice',
};

export const todayBreakfastMealSample: Meal = {
  ...genericMeal,
  id: 4,
  date: '2020-01-28',
};

export const todayLunchMealSample: Meal = {
  ...genericMeal,
  id: 5,
  date: '2020-01-28',
  time: '12:00',
  contents: 'Lunch\nCowboy Ribeye steak\nJuice',
  calories: 2000,
};

export const mealsSample = [
  yesterdayBreakfastMealSample,
  yesterdayLunchMealSample,
  yesterdayDinnerMealSample,
  todayBreakfastMealSample,
  todayLunchMealSample,
  {
    ...genericMeal,
    id: 6,
    userId: danRegularUserId,
  },
];
