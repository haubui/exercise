import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { BaseResponse } from './baseresponse';
import { Observable, map } from 'rxjs';
import { ResponseUtils } from './response.utils';

export class AppIntercepter<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> | Promise<Observable<BaseResponse<T>>> {
    const host = context.switchToHttp();
    const { statusCode } = host.getResponse();

    return next.handle().pipe(
      map((data) => {
        return ResponseUtils.generateSuccessResponse({
          status_code: statusCode,
          data: data,
        });
      }),
    );
  }
}
