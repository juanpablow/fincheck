import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthService } from 'src/modules/auth/auth.service';
import { mockCreateUserDto } from 'test/mocks/user-mock';
import { UsersService } from 'src/modules/users/users.service';
import { UsersModule } from 'src/modules/users/users.module';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let createUserId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      providers: [AuthService, UsersService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should signup a user', async () => {
    const user = await authService.signup(mockCreateUserDto);
    createUserId = user.id;
    expect(user).toHaveProperty('token');
  });

  afterEach(async () => {
    await usersService.deleteUser(createUserId);
  });
});
