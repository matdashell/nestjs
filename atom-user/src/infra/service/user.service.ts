import { Injectable, Logger } from "@nestjs/common";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { UserRepository } from "src/infra/database/repository/user.repository";
import { UserCreateRequest } from "../domain/request/user.create-request";
import { UserResponse } from "../domain/response/user.response";
import { UserMapper } from "../mapper/user.mapper";
import { UserValidator } from "../validate/user.validate";
import { request } from "http";

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly userValidator: UserValidator,
    private readonly userMapper: UserMapper
  ) { }

  private readonly logger = new Logger(UserService.name)

  getById(userId: number): Observable<UserResponse> {
    return this.repository.findOneById(userId).pipe(
      tap(entity => this.logger.log(`find one by id return ${JSON.stringify(entity)}`)),
      map(entity => this.userMapper.entityToResponse(entity))
    )
  }

  createUser(userRequest: UserCreateRequest): Observable<UserResponse> {
    this.userValidator.validDocument(userRequest.document)

    return this.userValidator.validCreate(userRequest.document).pipe(
      switchMap(() => this.repository.create(userRequest)),
      tap(entity => this.logger.log(`create user return ${JSON.stringify(entity)}`)),
      map(entity => this.userMapper.entityToResponse(entity))
    )
  }
}