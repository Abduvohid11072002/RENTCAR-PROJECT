import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './index';

export class UpdateUserDto extends PartialType(SignUpUserDto) { }
