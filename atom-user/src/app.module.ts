import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infra/controller/user.controller';
import { UserEntity } from './infra/database/entity/user.entity';
import { UserRepository } from './infra/database/repository/user.repository';
import { UserMapper } from './infra/mapper/user.mapper';
import { UserService } from './infra/service/user.service';
import { UserValidator } from './infra/validate/user.validate';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [UserEntity],
      synchronize: true,
      logging: ['query']
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserMapper,
    UserValidator
  ],
})
export class AppModule { }
