import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/infra/database/repositories/users.repositories';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findByEmail(email);

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const result = await this.usersRepo.createUser({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'income' },
              { name: 'Freelance', icon: 'freelance', type: 'income' },
              { name: 'Outro', icon: 'other', type: 'income' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'expense' },
              { name: 'Alimentação', icon: 'food', type: 'expense' },
              { name: 'Educação', icon: 'education', type: 'expense' },
              { name: 'Lazer', icon: 'fun', type: 'expense' },
              { name: 'Mercado', icon: 'grocery', type: 'expense' },
              { name: 'Roupas', icon: 'clothes', type: 'expense' },
              { name: 'Transporte', icon: 'transport', type: 'expense' },
              { name: 'Viagem', icon: 'travel', type: 'expense' },
              { name: 'Outro', icon: 'other', type: 'expense' },
            ],
          },
        },
      },
    });

    return result;
  }

  async deleteUser(userId: string) {
    await this.usersRepo.deleteUser(userId);
  }

  async findUserById(userId: string) {
    await this.usersRepo.findById(userId);
  }
}
