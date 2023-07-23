import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseResponse } from './baseresponse';
import { Error, DetailError, ErrorResponse } from './error.response';

export class ResponseUtils {
  static generateSuccessResponse({
    success = true,
    status_code,
    data,
  }: BaseResponse<any>): BaseResponse<any> {
    return { success, status_code, data };
  }

  static generateErrorResponse({
    success = false,
    status_code,
    timestamp,
    path,
    error,
  }: ErrorResponse): ErrorResponse {
    return { success, status_code, timestamp, path, error };
  }

  static generateError(
    options?: Error,
    errorCode?: number,
    title?: string,
  ): Error {
    return {
      code: options?.code ?? errorCode,
      title: options?.title ?? title ?? '',
      message: options?.message ?? '',
      errors: options?.errors ?? null,
    };
  }

  static generateDetailError(options: DetailError): DetailError {
    return {
      code: options.code,
      field: options.field ?? '',
      message: options.message ?? '',
    };
  }

  static throwErrorException(httpStatus: HttpStatus, options?: Error) {
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST: {
        const error = this.generateError(
          options,
          httpStatus,
          BadRequestException.name,
        );
        throw new BadRequestException(error);
      }
      case HttpStatus.UNAUTHORIZED: {
        const error = this.generateError(
          options,
          httpStatus,
          UnauthorizedException.name,
        );
        throw new UnauthorizedException(error);
      }
      case HttpStatus.FORBIDDEN: {
        const error = this.generateError(
          options,
          httpStatus,
          ForbiddenException.name,
        );
        throw new ForbiddenException(error);
      }
      case HttpStatus.NOT_FOUND: {
        const error = this.generateError(
          options,
          httpStatus,
          NotFoundException.name,
        );
        throw new NotFoundException(error);
      }
      case HttpStatus.METHOD_NOT_ALLOWED: {
        const error = this.generateError(
          options,
          httpStatus,
          MethodNotAllowedException.name,
        );
        throw new MethodNotAllowedException(error);
      }
      case HttpStatus.FORBIDDEN: {
        const error = this.generateError(
          options,
          httpStatus,
          ForbiddenException.name,
        );
        throw new ForbiddenException(error);
      }
      case HttpStatus.CONFLICT: {
        const error = this.generateError(
          options,
          httpStatus,
          ConflictException.name,
        );
        throw new ConflictException(error);
      }
      case HttpStatus.GATEWAY_TIMEOUT: {
        const error = this.generateError(
          options,
          httpStatus,
          RequestTimeoutException.name,
        );
        throw new RequestTimeoutException(error);
      }
      default: {
        const error = this.generateError(
          options,
          httpStatus,
          InternalServerErrorException.name,
        );
        throw new BadRequestException(error);
      }
    }
  }
}
