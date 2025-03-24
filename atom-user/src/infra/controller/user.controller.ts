import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common"
import { Observable, tap } from "rxjs"
import { UserCreateRequest } from "src/domain/request/user.create-request"
import { UserResponse } from "src/domain/response/user.response"
import { UserService } from "../service/user.service"

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  private readonly logger = new Logger(UserController.name)

  @Get(':userId')
  getUser(@Param('userId') userId: number): Observable<UserResponse> {
    this.logger.log(`getting user by id ${userId}`)
    return this.userService.getById(userId).pipe(
      tap(response => this.logger.log(`user response ${response}`))
    )
  }

  @Post()
  postUser(@Body() userRequest: UserCreateRequest): Observable<UserResponse> {
    this.logger.log(`creating new user by request ${userRequest}`)
    return this.userService.createUser(userRequest).pipe(
      tap(response => this.logger.log(`user response ${response}`))
    )
  }
}