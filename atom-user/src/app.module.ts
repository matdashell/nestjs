import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './infra/controller/user.controller';
import { UserMapper } from './infra/mapper/user.mapper';
import { UserRepository } from './infra/repository/user.repository';
import { UserService } from './infra/service/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory',
      entities: [UserEntity],
      synchronize: true
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserMapper
  ],
})
export class AppModule { }
