import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './infra/database/entity/account.entity';
import { AccountController } from './infra/controller/account.controller';
import { AccountService } from './infra/service/account.service';
import { AccountMapper } from './infra/mapper/account.mapper';
import { AccountRepository } from './infra/database/repository/account.repository';
import { AccountValidator } from './infra/validator/account.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [AccountEntity],
      synchronize: true,
      logging: ['query']
    })
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountMapper,
    AccountRepository,
    AccountValidator
  ],
})
export class AppModule { }
