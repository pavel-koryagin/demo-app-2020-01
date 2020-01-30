import { Request } from 'express';
import jwt from 'jsonwebtoken';
import UnexpectedCaseException from '../../src/errors/UnexpectedCaseException';
import { User } from '../../src/model/User.model';
import { UserRole } from '../../src/model/UserRole';
import UserOrm from '../model/UserOrm';
import ForbiddenException from '../../src/errors/ForbiddenException';

type JwtPayload = {
  id: number,
}

function getSecret(): string {
  if (!process.env.BACKEND_AUTH_JWT_SECRET) {
    if (process.env.NODE_ENV === 'test') {
      return 'test secret';
    }
    throw new UnexpectedCaseException();
  }
  return process.env.BACKEND_AUTH_JWT_SECRET;
}

export function createJwt(payload: JwtPayload) {
  return jwt.sign(payload, getSecret());
}

export function extractJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
  } catch (err) {
    return null;
  }
}

export default class Auth {
  id: number | null = null;
  user: User | null = null;

  static async getFromRequest(req: Request): Promise<Auth> {
    const result = new Auth();

    const { authorization } = req.headers;
    if (authorization) {
      const matches = /^(JWT) (\S+)\s*$/.exec(authorization);
      if (matches) {
        const [, type, value] = matches;
        if (type === 'JWT') {
          const payload = extractJwt(value);
          if (payload) {
            result.user = await UserOrm.findByPk(payload.id);
            if (result.user) {
              result.id = result.user.id;
            }
          }
        }
      }
    }

    return result;
  }

  static getAuthLoginPayload(user: User) {
    return {
      token: createJwt({ id: user.id }),
      user,
    }
  }

  isUser() {
    return this.user !== null;
  }

  requireUser() {
    if (!this.isUser()) {
      throw new ForbiddenException();
    }
  }

  isAdmin() {
    return this.user !== null && this.user.role === UserRole.Admin;
  }

  requireAdmin() {
    if (!this.isAdmin()) {
      throw new ForbiddenException('Must be admin');
    }
  }

  isManager() {
    return this.user !== null && this.user.role === UserRole.Manager;
  }

  requireManager() {
    if (!this.isManager()) {
      throw new ForbiddenException('Must be manager');
    }
  }

  requireManagerOrAdmin() {
    if (!this.isManager() && !this.isAdmin()) {
      throw new ForbiddenException('Must be manager or admin');
    }
  }

  isRegularUser() {
    return this.user !== null && this.user.role === UserRole.Regular;
  }

  requireRegularUser() {
    if (!this.isRegularUser()) {
      throw new ForbiddenException('Must be regular user');
    }
  }

  requireRegularUserOrAdmin() {
    if (!this.isRegularUser() && !this.isAdmin()) {
      throw new ForbiddenException('Must be regular user or admin');
    }
  }
}
