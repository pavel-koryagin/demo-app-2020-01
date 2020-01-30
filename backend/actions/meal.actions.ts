import { Op } from 'sequelize';
import { AsyncRequestHandler } from '../assembleServer';
import { mealsSample } from '../../src/qa/samples/Meal.samples';
import MealOrm from '../model/MealOrm';
import Auth from '../utils/Auth';
import { requireDate, requireTime, requireUint } from '../../src/utils/routingUtils';
import { MealsFilterDto } from '../../src/dto/MealsFilterDto';
import { DEFAULT_PAGE_SIZE, PaginationParamsDto } from '../../src/dto/PaginationDto';
import { FindOptions } from 'sequelize/types/lib/model';
import { ListDto } from '../../src/dto/ListDto';
import { Meal } from '../../src/model/Meal.model';

function getListParams({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  page,
  pageSize,
}: any): MealsFilterDto & PaginationParamsDto {
  return {
    dateStart: dateStart ? requireDate(dateStart) : null,
    dateEnd: dateEnd ? requireDate(dateEnd) : null,
    timeStart: timeStart ? requireTime(timeStart) : null,
    timeEnd: timeEnd ? requireTime(timeEnd) : null,
    page: page ? requireUint(page) : 0,
    pageSize: pageSize ? requireUint(pageSize) : DEFAULT_PAGE_SIZE,
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
    page,
    pageSize,
  } = getListParams(req.query);

  const where: any = {};
  const options: FindOptions = { where };

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

  // Apply pagination
  options.offset = page * pageSize;
  options.limit = pageSize;

  // Apply order
  options.order = [['date', 'DESC'], ['time', 'DESC']];

  // Query
  return {
    items: await MealOrm.findAll(options),
    pagination: {
      page,
      pageSize,
      totalSize: await MealOrm.count({ where }),
    },
  } as ListDto<Meal>;
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
