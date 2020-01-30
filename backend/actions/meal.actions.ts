import { Request } from 'express';
import Sequelize, { Op } from 'sequelize';
import _pick from 'lodash/pick';
import { AsyncRequestHandler } from '../assembleServer';
import MealOrm from '../model/MealOrm';
import Auth from '../utils/Auth';
import { requireDate, requireId, requireTime, requireUint } from '../../src/utils/routingUtils';
import { MealsFilterDto } from '../../src/dto/MealsFilterDto';
import { DEFAULT_PAGE_SIZE, PaginationParamsDto } from '../../src/dto/PaginationDto';
import { FindOptions } from 'sequelize/types/lib/model';
import { CaloriesPerDay, MealsListDto } from '../../src/dto/MealsListDto';
import NotFoundException from '../../src/errors/NotFoundException';
import ForbiddenException from '../../src/errors/ForbiddenException';

function getListParams({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  page,
  pageSize,
  getCalories,
}: any): MealsFilterDto & PaginationParamsDto & { getCalories: boolean } {
  return {
    dateStart: dateStart ? requireDate(dateStart) : null,
    dateEnd: dateEnd ? requireDate(dateEnd) : null,
    timeStart: timeStart ? requireTime(timeStart) : null,
    timeEnd: timeEnd ? requireTime(timeEnd) : null,
    page: page ? requireUint(page) : 0,
    pageSize: pageSize ? requireUint(pageSize) : DEFAULT_PAGE_SIZE,
    getCalories: getCalories === 'yes',
  }
}

export const listMealsAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireRegularUserOrAdmin();

  // Decode and sanitize params
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    page,
    pageSize,
    getCalories,
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
  options.order = [['date', 'DESC'], ['time', 'DESC'], ['id', 'DESC']];

  // Query
  const result: MealsListDto = {
    items: await MealOrm.findAll(options),
    pagination: {
      page,
      pageSize,
      totalSize: await MealOrm.count({ where }),
    },
  };

  // Calculate calories per day
  if (getCalories) {
    const caloriesPerDay: CaloriesPerDay = {};

    // We cannot rely on extracted data, because pagination could split the day so query DB one more time
    const dates = new Set(result.items.map(({ date }) => date));
    const stats: { date: string, total: number }[] = await MealOrm.findAll({
      attributes: [
        'date',
        [Sequelize.fn('sum', Sequelize.col('calories')), 'total'],
      ],
      where: { ...where, date: Array.from(dates) },
      group: ['date'],
      raw: true,
    });

    stats.forEach(({ date, total }) => {
      caloriesPerDay[date] = total;
    });

    result.caloriesPerDay = caloriesPerDay;
  }

  return result;
}

async function getRecordProlog(req: Request) {
  const auth = await Auth.getFromRequest(req);
  auth.requireRegularUserOrAdmin();

  // Decode and sanitize params
  const id = requireId(req.params.id);

  // Query result
  const meal = await MealOrm.findByPk(id);
  if (!meal) {
    throw new NotFoundException();
  }

  // Check auth limits
  if (meal.userId !== auth.id) {
    throw new ForbiddenException();
  }

  return { meal, auth };
}

export const getMealAction: AsyncRequestHandler = async req => {
  const { meal } = await getRecordProlog(req);
  return meal;
}

export const createMealAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireRegularUserOrAdmin();

  // Populate ORM
  const meal = new MealOrm();
  meal.set(req.body);

  // Override auth-related attributes
  if (!auth.isAdmin()) {
    meal.userId = auth.id as number;
  }

  // Save
  await meal.save();

  return meal;
}

export const updateMealAction: AsyncRequestHandler = async req => {
  const { meal, auth } = await getRecordProlog(req);

  // Populate ORM
  meal.set(_pick(req.body, [
    'date',
    'time',
    'contents',
    'calories',
    ...(auth.isAdmin() ? ['userId'] : []),
  ]));

  // Save
  await meal.save();

  return meal;
}

export const deleteMealAction: AsyncRequestHandler = async req => {
  const { meal } = await getRecordProlog(req);

  // Delete
  await meal.destroy();

  return {};
}
