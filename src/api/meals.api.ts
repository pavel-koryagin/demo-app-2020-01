import qs from 'querystring';
import { mealsSample } from '../qa/samples/Meal.samples';
import { Meal } from '../model/Meal.model';
import { requestBackend } from './axios';
import { MealsFilterDto } from '../dto/MealsFilterDto';
import { ListDto } from '../dto/ListDto';

async function emulateCall(message: string) {
  console.log('API server:', message);
  await new Promise(resolve => setTimeout(resolve, 1500));
}

export async function apiListMeals(filter?: MealsFilterDto, page?: number): Promise<ListDto<Meal>> {
  let url = '/meals/?pageSize=3';
  if (page) {
    url += '&page=' + page;
  }
  if (filter) {
    url += '&' + qs.encode(filter as any);
  }
  return requestBackend('get', url);
}

export async function apiGetMeal(id: number): Promise<Meal> {
  for (let i = 0; i < mealsSample.length; i++) {
    if (mealsSample[i].id === id) {
      return mealsSample[i];
    }
  }
  return mealsSample[0];
}

export async function apiCreateMeal(values: Partial<Meal>): Promise<Meal> {
  await emulateCall('Create');
  return { ...mealsSample[0], ...values };
}

export async function apiUpdateMeal(id: number, values: Partial<Meal>): Promise<Meal> {
  await emulateCall('Update');
  return { ...mealsSample[0], id, ...values };
}

export async function apiDeleteMeal(id: number) {
  await emulateCall('Delete');
}
