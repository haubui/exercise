import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './role.decorator';
import { ResponseUtils } from '../base/response.utils';
import { ERROR_CODES } from '../base/error.code';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isMatchRole = matchRoles(roles, user.user_role);
    if (!isMatchRole) {
      ResponseUtils.throwErrorException(HttpStatus.FORBIDDEN, {
        message: ERROR_CODES.ACTION_FORBIDEN.message,
        errors: [
          {
            code: ERROR_CODES.ACTION_FORBIDEN.error_code,
            message: ERROR_CODES.ACTION_FORBIDEN.message,
          },
        ],
      });
    }
    return isMatchRole;
  }
}
function matchRoles(roles: Role[], userRole: string): boolean {
  return roles.some((role) => role === userRole);
}
