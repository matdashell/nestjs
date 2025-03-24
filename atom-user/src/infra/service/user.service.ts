import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserCreateRequest } from "src/domain/request/user.create-request";
import { UserResponse } from "src/domain/response/user.response";
import { UserRepository } from "src/infra/repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository
  ) { }

  getById(userId: number): Observable<UserResponse> {
    throw new Error("Method not implemented.");
  }

  createUser(userRequest: UserCreateRequest): Observable<UserResponse> {
    throw new Error("Method not implemented.");
  }
}