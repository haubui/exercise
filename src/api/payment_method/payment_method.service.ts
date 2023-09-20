import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './entities/payment_method.entity';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { ERROR_CODES } from 'src/shared/base/error.code';
import { sequelizeGloble } from 'src/database/sequalize.config';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private paymentModel: typeof PaymentMethod,
  ) {}
  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod = plainToInstance(
      PaymentMethod,
      createPaymentMethodDto,
    );
    paymentMethod.save();
    return paymentMethod;
  }

  findAll() {
    return this.paymentModel.findAll();
  }

  findOne(id: number) {
    return this.paymentModel.findAll({ where: { id: id } });
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    try {
      const paymentMethodWantToUpdate = await this.paymentModel.findOne({
        where: { id: id },
      });
      if (paymentMethodWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const paymentMethod = plainToInstance(
        PaymentMethod,
        updatePaymentMethodDto,
      );
      await paymentMethodWantToUpdate.update(paymentMethod);
      return paymentMethod;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async remove(id: number) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const paymentMethodWanttoDelete = await this.paymentModel.findOne({
        where: { id: id },
      });
      if (paymentMethodWanttoDelete == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      await this.paymentModel.destroy({
        where: { id: id },
        transaction: transaction,
      });
      await transaction.commit();
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'PaymentMethod item deleted successfully' },
      });
    } catch (error) {
      console.log(error);
      transaction.rollback();
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, error);
    }
  }
}
