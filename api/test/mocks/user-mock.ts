import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export const mockCreateUserDto: CreateUserDto = {
  name: 'Juan Pablo',
  email: `teste-${Date.now()}@example.com`,
  password: 'test123',
};
