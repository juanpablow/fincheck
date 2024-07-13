import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/users.service';
import { mockCreateUserDto } from 'test/mocks/user-mock';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersRepository } from 'src/infra/database/repositories/users.repositories';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let createdUserId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should create a user', async () => {
    const user = await service.createUser(mockCreateUserDto);
    expect(user).toHaveProperty('id');
    createdUserId = user.id;
  });

  it('should delete a user', async () => {
    const userId = createdUserId;

    await service.deleteUser(userId);

    const userExists = await repository.findById(userId);
    expect(userExists).toBeNull();
  });
});
