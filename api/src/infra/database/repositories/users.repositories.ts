import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(createUserDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createUserDto);
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
  }

  deleteUser(userId: string) {
    return this.prismaService.user.delete({ where: { id: userId } });
  }

  findById(userId: string) {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }
}
