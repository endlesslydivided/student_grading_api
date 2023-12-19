import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './postgresql.provider';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
