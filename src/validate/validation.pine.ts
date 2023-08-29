import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DetailError } from 'src/base/error.response';
import { ResponseUtils } from 'src/base/response.utils';

@Injectable()
export class CarRentalValidationPine implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log(value);
    const object = plainToInstance(metatype, value);
    const validationErrors = await validate(object);
    if (validationErrors.length > 0) {
      const errors: Array<DetailError> = validationErrors.map((error) =>
        ResponseUtils.generateDetailError({
          code: HttpStatus.BAD_REQUEST,
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }),
      );
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, {
        code: HttpStatus.BAD_REQUEST,
        errors: errors,
        message: errors.length > 0 ? errors[0].message : '',
      });
    }
    return object;
  }
  private toValidate(metatype: Type<any>): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
