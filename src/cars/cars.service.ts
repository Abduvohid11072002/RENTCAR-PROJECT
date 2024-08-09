import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from '../common/dto/create-car.dto';
import { UpdateCarDto } from '../common/dto/update-car.dto';
import { CarsRepository } from './cars.repository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const { brandId, modelId, colorId, factoryDate, price } = createCarDto;

      const existBrand = await this.carsRepository.findByIdBrand(brandId);

      const existModel = await this.carsRepository.findByIdModel(modelId);

      const existColor = await this.carsRepository.findByIdColor(colorId);

      if (
        existBrand?.id !== brandId ||
        existColor?.id !== colorId ||
        existModel?.id !== modelId ||
        price < 1 ||
        factoryDate < '2020'
      ) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const newCar = await this.carsRepository.createCar({
        brandId,
        modelId,
        colorId,
        factoryDate,
        price,
        ...createCarDto,
      });

      return newCar;
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
      const existCars = await this.carsRepository.findAllCars();

      if (!existCars[0]?.id) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return existCars;
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
      const existCar = await this.carsRepository.findByIdCar(id);

      if (!existCar) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return existCar;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    try {
      const existCar = await this.carsRepository.findByIdCar(id);

      if (!existCar) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const updatedCar = await this.carsRepository.updateCar(id, updateCarDto);

      return updatedCar;
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
      const existCar = await this.carsRepository.findByIdCar(id);

      if (!existCar) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.carsRepository.deleteCar(id);

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
