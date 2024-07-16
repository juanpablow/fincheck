import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.enum';

export class CreateTransactionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
