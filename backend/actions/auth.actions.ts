import { AsyncRequestHandler } from '../assembleServer';
import UserOrm from '../model/UserOrm';
import Auth from '../utils/Auth';
import AuthLoginDto from '../dto/AuthLoginDto';
import ForbiddenException from '../../src/errors/ForbiddenException';
import { UserRole } from '../../src/model/UserRole';

export const authLoginAction: AsyncRequestHandler = async req => {
  // Input
  const input = new AuthLoginDto();
  input.email = req.body.email;
  input.password = req.body.password;
  await input.validate();

  // Auth
  const foundUser: UserOrm | null = await UserOrm.findOne({ where: { email: input.email } });
  if (foundUser && (await foundUser.validatePassword(input.password))) {
    return Auth.getAuthLoginPayload(foundUser);
  }
  throw new ForbiddenException('Email or password do not match');
}

export const authRegisterAction: AsyncRequestHandler = async req => {
  // Populate ORM
  const user = new UserOrm();
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  // TODO: Validate password complexity. Needs DTO with validation
  await user.setPassword(String(req.body.password || ''));
  // TODO: Move to validators
  user.dailyTarget = 2000;
  user.role = UserRole.Regular;

  // Save
  await user.save();

  return Auth.getAuthLoginPayload(user);
}

export const authRefreshAction: AsyncRequestHandler = async req => {
  const auth = await Auth.getFromRequest(req);

  if (auth.user) {
    return Auth.getAuthLoginPayload(auth.user);
  }

  return null;
}
