import { Op } from 'sequelize';
import { AsyncRequestHandler } from '../assembleServer';
import { mealsSample } from '../../src/qa/samples/Meal.samples';
import MealOrm from '../model/MealOrm';
import Auth from '../utils/Auth';
import { requireDate, requireTime } from '../../src/utils/routingUtils';
import { MealsFilterDto } from '../../src/dto/MealsFilterDto';

function getListParams({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
}: any) {
  return {
    dateStart: dateStart ? requireDate(dateStart) : null,
    dateEnd: dateEnd ? requireDate(dateEnd) : null,
    timeStart: timeStart ? requireTime(timeStart) : null,
    timeEnd: timeEnd ? requireTime(timeEnd) : null,
  }
}

export const listMealsAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireRegularUserOrAdmin();

  // Decode params
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
  }: MealsFilterDto = getListParams(req.query);

  const where: any = {};

  // Apply auth limits
  if (auth.isRegularUser()) {
    where.userId = auth.id;
  }

  // Apply filter
  if (dateStart || dateEnd) {
    where.date = {};
    if (dateStart) where.date[Op.gte] = dateStart;
    if (dateEnd) where.date[Op.lte] = dateEnd;
  }
  if (timeStart || timeEnd) {
    where.time = {};
    if (timeStart) where.time[Op.gte] = timeStart;
    if (timeEnd) where.time[Op.lte] = timeEnd;
  }

  // Query
  return MealOrm.findAll({ where });
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
