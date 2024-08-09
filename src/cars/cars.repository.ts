import { Injectable } from '@nestjs/common';
import {
  CreateCarDto,
  UpdateCarDto,
} from 'src/common/dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneColor(color: string) {
    return await this.prisma.color.findFirst({ where: { color } });
  }

  async findOneModel(name: string) {
    return await this.prisma.model.findFirst({ where: { name } });
  }

  async findByIdColor(id: string) {
    return await this.prisma.color.findUnique({ where: { id } });
  }

  async findByIdBrand(id: string) {
    return await this.prisma.brand.findUnique({ where: { id } });
  }

  async findByIdCar(id: string) {
    return await this.prisma.car.findUnique({ where: { id } });
  }

  async findByIdModel(id: string) {
    return await this.prisma.model.findUnique({ where: { id } });
  }

  async findByIdPayment(id: string) {
    return await this.prisma.payment.findUnique({ where: { id } });
  }

  async createColor(color: string) {
    return await this.prisma.color.create({ data: { color } });
  }

  async createModel(name: string) {
    return await this.prisma.model.create({ data: { name } });
  }

  async createBrand(name: string) {
    return await this.prisma.brand.create({ data: { name } });
  }

  async deleteColor(id: string) {
    await this.prisma.color.delete({ where: { id } });
  }

  async createPayment(payment: {
    userId: string;
    carId: string;
    paymentNumber: number;
  }) {
    return await this.prisma.payment.create({ data: { ...payment } });
  }

  async findOnePayment(userId: string, paymentNumber: number) {
    return await this.prisma.payment.findFirst({
      where: { userId, paymentNumber },
    });
  }

  async deleteModel(id: string) {
    await this.prisma.model.delete({ where: { id } });
  }

  async findOneBrand(name: string) {
    return await this.prisma.brand.findFirst({ where: { name } });
  }

  async deleteBrand(id: string) {
    await this.prisma.brand.delete({ where: { id } });
  }

  async createCar(createCarDto: CreateCarDto) {
    const { brandId, modelId, colorId, factoryDate, price, carImages } =
      createCarDto;

    return await this.prisma.car.create({
      data: {
        brandId,
        modelId,
        colorId,
        factoryDate: new Date(factoryDate),
        price,
        carImages,
      },
    });
  }

  async findAllCars() {
    return await this.prisma.car.findMany({
      include: { model: true, brand: true, color: true },
    });
  }

  async findAllPayments() {
    return await this.prisma.payment.findMany({
      include: { user: true, car: true },
    });
  }

  async updateCar(id: string, update: UpdateCarDto) {
    await this.prisma.car.update({ where: { id }, data: { ...update } });
    return await this.findByIdCar(id);
  }

  async updatePaymentStatus(id: string) {
    await this.prisma.payment.update({ where: { id }, data: { status: 'OK' } });
  }

  async deleteCar(id: string) {
    await this.prisma.car.delete({ where: { id } });
  }

  async deleteDetail(id: string) {
    await this.prisma.rentDetails.delete({ where: { id } });
  }

  async deletePayment(id: string) {
    await this.prisma.payment.delete({ where: { id } });
  }

  async createRentDetails({
    userId,
    carId,
    paymentId,
    start_date,
    end_date,
    total_price,
  }: {
    userId: string;
    carId: string;
    paymentId: string;
    start_date: Date;
    end_date: Date;
    total_price: number;
  }) {
    return await this.prisma.rentDetails.create({
      data: {
        userId,
        carId,
        paymentId,
        start_date,
        end_date,
        total_price,
      },
    });
  }

  async findByIdDetail(id: string) {
    return await this.prisma.rentDetails.findUnique({ where: { id } });
  }

  async findAllDetail() {
    return await this.prisma.rentDetails.findMany({
      include: { user: true, car: true, payment: true },
    });
  }

  async findAllBrands() {
    return await this.prisma.brand.findMany();
  }

  async findAllColors() {
    return await this.prisma.color.findMany();
  }

  async findAllModels() {
    return await this.prisma.model.findMany();
  }
}
