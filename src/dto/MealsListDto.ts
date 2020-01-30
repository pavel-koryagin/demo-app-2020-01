import { ListDto } from './ListDto';
import { Meal } from '../model/Meal.model';

export type CaloriesPerDay = { [date: string]: number }

export interface MealsListDto extends ListDto<Meal> {
  caloriesPerDay?: CaloriesPerDay;
}
