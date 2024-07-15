import { SignupDto } from 'src/modules/auth/dto/signup.dto';

export const mockCreateUserDto: SignupDto = {
  name: 'Juan Pablo',
  email: `teste-${Date.now()}@example.com`,
  password: 'test123',
};
