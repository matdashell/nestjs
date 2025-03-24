import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/user.entity";

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly repository: Repository<UserEntity>
  ) { }
}