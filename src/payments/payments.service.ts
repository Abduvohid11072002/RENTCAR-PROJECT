import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePaymentDto,
  PaymentActiveDto,
} from '../common/dto/create-payment.dto';
import { UserRepository } from 'src/user/user.repository';
import { CarsRepository } from 'src/cars/cars.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarsRepository,
    private readonly mailerService: MailerService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, request: any) {
    try {
      const { email, id, role } = request.user;

      const { userId, carId } = createPaymentDto;

      const existUser = await this.userRepository.findOneUser(userId);

      const existCar = await this.carRepository.findByIdCar(carId);

      if (!existUser || !existCar) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const paymentNumber = Math.floor(Math.random() * 900000) + 100000;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Payment Number',
        html: `<h2>${paymentNumber}</h2>`,
      });

      if (role === 'USER') {
        await this.userRepository.updateUserRole(id);
      }

      const payment = await this.carRepository.createPayment({
        userId,
        carId,
        paymentNumber,
      });

      if (!payment) {
        return new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Payment Raqamini yuboring',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async payment_active(paymentDto: PaymentActiveDto, request: any) {
    try {
      const { id } = request.user;

      const { paymentNumber } = paymentDto;

      const existPayment = await this.carRepository.findOnePayment(
        id,
        paymentNumber,
      );

      if (!existPayment) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      if (paymentNumber !== existPayment.paymentNumber) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      await this.carRepository.updatePaymentStatus(existPayment.id);

      return {
        message: 'Successfully Payment',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allPayments = await this.carRepository.findAllPayments();

      if (!allPayments) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return allPayments;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const existPayment = await this.carRepository.findByIdPayment(id);

      if (!existPayment) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      return existPayment;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const existPayment = await this.carRepository.findByIdPayment(id);

      if (!existPayment) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      await this.carRepository.deletePayment(id);

      return {
        message: 'Successfully Deleted',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
