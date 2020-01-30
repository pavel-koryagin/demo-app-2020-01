import { requestBackend } from './axios';
import { LoginDto } from '../dto/LoginDto';
import { AuthPayloadDto } from '../dto/AuthPayloadDto';

export async function apiLogin(login: LoginDto): Promise<AuthPayloadDto> {
  return requestBackend('post', '/auth/login/', login);
}

export async function apiRefresh(): Promise<AuthPayloadDto | null> {
  return requestBackend('get', '/auth/refresh/');
}
