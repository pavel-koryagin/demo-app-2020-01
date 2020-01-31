import { Request } from 'express';
import _pick from 'lodash/pick';
import { AsyncRequestHandler } from '../assembleServer';
import UserOrm from '../model/UserOrm';
import Auth from '../utils/Auth';
import { requireId, requireUint } from '../../src/utils/routingUtils';
import { DEFAULT_PAGE_SIZE, PaginationParamsDto } from '../../src/dto/PaginationDto';
import { FindOptions } from 'sequelize/types/lib/model';
import NotFoundException from '../../src/errors/NotFoundException';
import ForbiddenException from '../../src/errors/ForbiddenException';
import { ListDto } from '../../src/dto/ListDto';
import { User } from '../../src/model/User.model';
import { UserRole } from '../../src/model/UserRole';

function getListParams({
  page,
  pageSize,
}: any): PaginationParamsDto {
  return {
    page: page ? requireUint(page) : 0,
    pageSize: pageSize ? requireUint(pageSize) : DEFAULT_PAGE_SIZE,
  }
}

export const listUsersAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireManagerOrAdmin();

  // Decode and sanitize params
  const {
    page,
    pageSize,
  } = getListParams(req.query);

  const where: any = {};
  const options: FindOptions = { where };

  // Apply pagination
  options.offset = page * pageSize;
  options.limit = pageSize;

  // Apply order
  options.order = [['id', 'DESC']];

  // Query
  return  {
    items: await UserOrm.findAll(options),
    pagination: {
      page,
      pageSize,
      totalSize: await UserOrm.count({ where }),
    },
  } as ListDto<User>;
}

async function getRecordProlog(req: Request) {
  const auth = await Auth.getFromRequest(req);
  auth.requireUser();

  // Decode and sanitize params
  const id = requireId(req.params.id);

  // Query result
  const user = await UserOrm.findByPk(id);
  if (!user) {
    throw new NotFoundException();
  }

  // Apply auth
  if (!auth.isManager() && !auth.isAdmin() && user.id !== auth.id) {
    throw new ForbiddenException('Must be manager or admin');
  }

  return { user, auth };
}

export const getUserAction: AsyncRequestHandler = async req => {
  const { user } = await getRecordProlog(req);
  return user;
}

function filterInput(auth: Auth, input: any) {
  return _pick(input, [
    'firstName',
    'lastName',
    'dailyTarget',
    ...((auth.isAdmin() || auth.isManager()) ? ['role'] : []),
  ]);
}

export const createUserAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);
  auth.requireManagerOrAdmin();

  // Populate ORM
  const user = new UserOrm();
  user.set(filterInput(auth, req.body));
  user.email = req.body.email;
  // TODO: Validate password complexity. Needs DTO with validation
  await user.setPassword(String(req.body.password || ''));

  // TODO: Move to validators
  if (user.role === UserRole.Regular && user.dailyTarget == null) {
    user.dailyTarget = 2000;
  }

  // Save
  await user.save();

  return user;
}

export const updateUserAction: AsyncRequestHandler = async req => {
  const { user, auth } = await getRecordProlog(req);

  // Populate ORM
  user.set(filterInput(auth, req.body));
  if (req.body.password) {
    user.setPassword(String(req.body.password));
  }

  // Save
  await user.save();

  return user;
}

export const deleteUserAction: AsyncRequestHandler = async req => {
  const { user, auth } = await getRecordProlog(req);

  // Do not delete yourself
  if (user.id === auth.id) {
    throw new ForbiddenException('User cannot delete own record');
  }

  // Delete
  await user.destroy();

  return {};
}
