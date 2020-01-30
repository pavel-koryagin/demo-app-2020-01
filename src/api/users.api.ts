import { User } from '../model/User.model';
import { requestBackend } from './axios';
import { ListDto } from '../dto/ListDto';

export async function apiListUsers(page?: number): Promise<ListDto<User>> {
  let url = '/users/?pageSize=20';
  if (page) {
    url += '&page=' + page;
  }
  return requestBackend('get', url);
}

export async function apiGetUser(id: number): Promise<User> {
  return requestBackend('get', `/users/${id}/`);
}

export async function apiCreateUser(values: Partial<User>): Promise<User> {
  return requestBackend('post', '/users/', values);
}

export async function apiUpdateUser(id: number, values: Partial<User>): Promise<User> {
  return requestBackend('put', `/users/${id}`, values);
}

export async function apiDeleteUser(id: number) {
  return requestBackend('delete', `/users/${id}`);
}
