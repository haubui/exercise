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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private cacheService: CacheService,
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
    return validateRequest(request, this.jwtService, this.cacheService);
  }
}

async function validateRequest(
  request: any,
  jwtService: JwtService,
  cacheService: CacheService,
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
