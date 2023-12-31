import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { GuardUtils } from './guard.utils';
import { Reflector } from '@nestjs/core';
import { TokenPayload } from 'src/api/auth/token.payload';
import { AuthService } from 'src/api/auth/auth.service';
import { ERROR_CODES } from 'src/shared/base/error.code';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private cacheService: CacheService,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    return validateRequest(
      request,
      this.jwtService,
      this.cacheService,
      this.authService,
    );
  }
}

async function validateRequest(
  request: any,
  jwtService: JwtService,
  cacheService: CacheService,
  authService: AuthService,
): Promise<boolean> {
  const token = GuardUtils.extractTokenFromRequest(request);
  if (!token) {
    ResponseUtils.throwErrorException(HttpStatus.UNAUTHORIZED, {
      message: ERROR_CODES.UNAUTHORIZED.message,
      errors: [
        {
          code: ERROR_CODES.UNAUTHORIZED.error_code,
          message: ERROR_CODES.UNAUTHORIZED.message,
        },
      ],
    });
  }
  try {
    if (token) {
      const cachePayload: TokenPayload =
        await cacheService.getPayloadFromTokenInCache(token);
      if (!(cachePayload === undefined)) {
        request.user = cachePayload;
        console.log('payload from cache ', cachePayload);
        return true;
      }
      const didUserLogoutThisToken = await authService.didUserLogoutThisToken(
        token,
      );
      if (!didUserLogoutThisToken) {
        ResponseUtils.throwErrorException(HttpStatus.UNAUTHORIZED, {
          message: ERROR_CODES.UNAUTHORIZED.message,
          errors: [
            {
              code: ERROR_CODES.UNAUTHORIZED.error_code,
              message: ERROR_CODES.UNAUTHORIZED.message,
            },
          ],
        });
        return false;
      }
      const payload: TokenPayload = await jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
      console.log('payload from jwt ', payload);
      cacheService.saveToken(token, payload);
      return true;
    }
  } catch (error) {
    console.log(' error t ', error);
    ResponseUtils.throwErrorException(HttpStatus.UNAUTHORIZED, {
      message: ERROR_CODES.UNAUTHORIZED.message,
      errors: [
        {
          code: ERROR_CODES.UNAUTHORIZED.error_code,
          message: ERROR_CODES.UNAUTHORIZED.message,
        },
      ],
    });
    return false;
  }
}
