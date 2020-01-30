import qs from 'querystring';
import { Meal } from '../model/Meal.model';
import { requestBackend } from './axios';
import { MealsFilterDto } from '../dto/MealsFilterDto';
import { CaloriesPerDay, MealsListDto } from '../dto/MealsListDto';

interface MealsListWithCaloriesDto extends MealsListDto {
  caloriesPerDay: CaloriesPerDay;
}

export async function apiListMeals(filter?: MealsFilterDto, page?: number): Promise<MealsListWithCaloriesDto> {
  let url = '/meals/?pageSize=20&getCalories=yes';
  if (page) {
    url += '&page=' + page;
  }
  if (filter) {
    url += '&' + qs.encode(filter as any);
  }
  return requestBackend('get', url);
}

export async function apiGetMeal(id: number): Promise<Meal> {
  return requestBackend('get', `/meals/${id}/`);
}

export async function apiCreateMeal(values: Partial<Meal>): Promise<Meal> {
  return requestBackend('post', '/meals/', values);
}

export async function apiUpdateMeal(id: number, values: Partial<Meal>): Promise<Meal> {
  return requestBackend('put', `/meals/${id}`, values);
}

export async function apiDeleteMeal(id: number) {
  return requestBackend('delete', `/meals/${id}`);
}
