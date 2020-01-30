import { User } from '../model/User.model';

export interface AuthPayloadDto {
  token: string,
  user: User,
}
