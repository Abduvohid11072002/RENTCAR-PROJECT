import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from '../common/dto/create-color.dto';
import { CarsRepository } from 'src/cars/cars.repository';

@Injectable()
export class ColorService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async createColor(createColorDto: CreateColorDto) {
    try {
      const existColor = await this.carsRepository.findOneColor(
        createColorDto.color,
      );

      if (existColor) {
        return new HttpException(
          'This color is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newColor = await this.carsRepository.createColor(
        createColorDto.color,
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

  async getAllColors() {
    try {
      const existColors = await this.carsRepository.findAllColors();

      if (!existColors) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existColors;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneColor(id: string) {
    try {
      const existColor = await this.carsRepository.findByIdColor(id);

      if (!existColor) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existColor;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteColor(id: string) {
    try {
      const existColor = await this.carsRepository.findByIdColor(id);

      if (!existColor) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.carsRepository.deleteColor(id);

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
