import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/infra/database/repositories/users.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
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

    // Generate JWT
    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
      id: user.id,
    };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
      id: user.id,
    };
  }

  async getUserById(userId: string) {
    const user = await this.usersRepo.findUnique({
      where: { id: userId },
    });
    return user;
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
