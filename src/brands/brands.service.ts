import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../common/dto/create-brand.dto';
import { CarsRepository } from 'src/cars/cars.repository';

@Injectable()
export class BrandsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async createBrand(createBrandDto: CreateBrandDto) {
    try {
      const existBrand = await this.carsRepository.findOneBrand(
        createBrandDto.name,
      );

      if (existBrand) {
        return new HttpException(
          'This Brand is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newBrand = await this.carsRepository.createBrand(
        createBrandDto.name,
      );

      if (!newBrand) {
        return new HttpException(
          'Internal Servser Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Brand successfully created',
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

  async getAllBrands() {
    try {
      const existBrands = await this.carsRepository.findAllBrands();

      if (!existBrands) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existBrands;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneBrand(id: string) {
    try {
      const existBrand = await this.carsRepository.findByIdBrand(id);

      if (!existBrand) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      return existBrand;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBrand(id: string) {
    try {
      const existBrand = await this.carsRepository.findByIdBrand(id);

      if (!existBrand) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      await this.carsRepository.deleteBrand(id);

      return {
        message: 'Brand successfully deleted',
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
