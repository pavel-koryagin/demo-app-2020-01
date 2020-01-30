import { AsyncRequestHandler } from '../assembleServer';
import UserOrm from '../model/UserOrm';
import Auth from '../utils/Auth';
import AuthLoginDto from '../dto/AuthLoginDto';
import ForbiddenException from '../../src/errors/ForbiddenException';

export const authLoginAction: AsyncRequestHandler = async req => {
  // Input
  const input = new AuthLoginDto();
  input.email = req.body.email;
  input.password = req.body.password;
  await input.validate();

  // Auth
  const foundUser: UserOrm | null = await UserOrm.findOne({ where: { email: input.email } });
  if (foundUser && foundUser.validatePassword(input.password)) {
    return Auth.getAuthLoginPayload(foundUser);
  }
  throw new ForbiddenException('Email or password do not match');
}
