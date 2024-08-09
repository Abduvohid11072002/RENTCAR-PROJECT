import { SetMetadata } from '@nestjs/common';

export enum Role {
  CLIENT = 'CLIENT',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
  USER = 'USER'

}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
