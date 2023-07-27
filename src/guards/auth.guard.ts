import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ResponseUtils } from 'src/base/response.utils';
import { GuardUtils } from './guard.utils';
import { Reflector } from '@nestjs/core';
import { TokenPayload } from 'src/auth/token.payload';
import { CacheService } from 'src/cache/cache.service';
import { AuthService } from 'src/auth/auth.service';

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
      message: UnauthorizedException.name,
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
          message: UnauthorizedException.name,
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
    ResponseUtils.throwErrorException(HttpStatus.UNAUTHORIZED, {
      message: UnauthorizedException.name,
    });
    return false;
  }
}
