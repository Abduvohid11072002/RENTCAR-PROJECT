import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/common/dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: any) {
    try {
      const { firstName, email, password } = createUserDto;

      const existUser = await this.userRepository.findByEmail(email);

      if (existUser) {
        return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }
      const salt = this.configService.get<number>('bcrypt_salt');

      const hashedPassword = await bcrypt.hash(password, salt);

      const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

      const newUser = await this.userRepository.createUser({
        firstName,
        email,
        ...createUserDto,
        password: hashedPassword,
      });

      await this.mailerService.sendMail({
        to: email,
        subject: 'Your One Time Password',
        html: `<h2>${otp}</h2>`,
      });

      await this.userRepository.createOtp({ userId: newUser.id, otp });

      return {
        message: 'User created successfully',
        statusCode: 201,
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
      const allUsers = await this.userRepository.findAllUsers();

      if (!allUsers) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return allUsers;
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
      const existUser = await this.userRepository.findOneUser(id);

      if (!existUser[0]?.id) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return existUser;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, request: any) {
    try {
      const existUser = await this.userRepository.findOneUser(id);

      if (!existUser[0]?.id) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const user = request.user;

      if (user.id !== id || user.role !== 'ADMIN') {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const updatedUser = await this.userRepository.updateUser(
        id,
        updateUserDto,
      );

      return updatedUser;
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
      const existUser = await this.userRepository.findOneUser(id);

      if (!existUser[0]?.id) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.userRepository.deleteUser(id);

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
