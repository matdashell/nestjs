import { Injectable } from "@nestjs/common";
import { UserEntity } from "../database/entity/user.entity";
import { UserCreateRequest } from "../domain/request/user.create-request";
import { UserResponse } from "../domain/response/user.response";

@Injectable()
export class UserMapper {
  requestToEntity(userRequest: UserCreateRequest): UserEntity {
    return {
      ...userRequest
    } as UserEntity
  }

  entityToResponse(entity: UserEntity): UserResponse {
    return {
      ...entity
    } as UserResponse
  }
}