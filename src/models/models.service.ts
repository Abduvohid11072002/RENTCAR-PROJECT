import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModelDto } from '../common/dto/create-model.dto';
import { CarsRepository } from 'src/cars/cars.repository';

@Injectable()
export class ModelsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async createModel(createModelDto: CreateModelDto) {
    try {
      const existModel = await this.carsRepository.findOneModel(
        createModelDto.name,
      );

      if (existModel) {
        return new HttpException(
          'This color is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newColor = await this.carsRepository.createModel(
        createModelDto.name,
      );

      if (!newColor) {
        return new HttpException(
          'Internal Servser Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Color successfully created',
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllModels() {
    try {
      const existModels = await this.carsRepository.findAllModels();

      if (!existModels) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existModels;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneModel(id: string) {
    try {
      const existModel = await this.carsRepository.findByIdModel(id);

      if (!existModel) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existModel;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteModel(id: string) {
    try {
      const existModel = await this.carsRepository.findByIdModel(id);

      if (!existModel) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.carsRepository.deleteModel(id);

      return {
        message: 'Successfully Deleted',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
