import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CategoriesModule,
    BankAccountsModule,
    TransactionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
