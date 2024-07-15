import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  deleteUser(userId: string) {
    return this.usersRepo.deleteUser(userId);
  }
}
