import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  NotEquals,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  nodeEnv: string;

  @IsString()
  @IsNotEmpty()
  postgresHost: string;

  @IsNumberString()
  @IsNotEmpty()
  postgresPort: string;

  @IsString()
  @IsNotEmpty()
  postgresUser: string;

  @IsString()
  @IsNotEmpty()
  postgresDB: string;

  @IsString()
  @IsNotEmpty()
  postgresPassword: string;

  @IsString()
  @IsNotEmpty()
  databaseUrl: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  nodeEnv: process.env.NODE_ENV,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresDB: process.env.POSTGRES_DB,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
