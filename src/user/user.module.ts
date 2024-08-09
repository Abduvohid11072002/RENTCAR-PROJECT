import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserRepository, UserService],
})
export class UserModule { }
