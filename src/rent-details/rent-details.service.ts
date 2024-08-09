import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRentDetailDto } from '../common/dto/create-rent-detail.dto';
import { CarsRepository } from 'src/cars/cars.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class RentDetailsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarsRepository,
  ) {}
  async create(createRentDetailDto: CreateRentDetailDto) {
    try {
      const { carId, paymentId, userId, start_date, end_date } =
        createRentDetailDto;

      const existCar = await this.carRepository.findByIdCar(carId);
      const existPayment = await this.carRepository.findByIdPayment(paymentId);
      const existUser = await this.userRepository.findByIdUser(userId);

      if (!existPayment || !existCar || !existUser) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (startDate > endDate) {
        throw new HttpException(
          "Start Date va End Date noto'g'ri",
          HttpStatus.BAD_REQUEST,
        );
      }

      const total_price =
        (endDate.getTime() - startDate.getTime()) * existCar.price.toNumber();

      if (existPayment.status !== 'OK') {
        throw new HttpException('Payment qilinmagan', HttpStatus.BAD_REQUEST);
      }

      await this.carRepository.createRentDetails({
        userId,
        carId,
        paymentId,
        start_date: startDate,
        end_date: endDate,
        total_price,
      });

      return {
        message: 'Rent-details successfully created',
        statusCode: 201,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const existRentDetail = await this.carRepository.findAllDetail();

      if (!existRentDetail) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      return existRentDetail;
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
      const existRentDetail = await this.carRepository.findByIdDetail(id);

      if (!existRentDetail) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      return existRentDetail;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const existRentDetail = await this.carRepository.findByIdDetail(id);

      if (!existRentDetail) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      await this.carRepository.deleteDetail(id);

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
