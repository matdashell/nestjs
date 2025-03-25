import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { AccountService } from "../service/account.service";
import { Observable, tap } from "rxjs";
import { AccountResponse } from "../domain/response/account.response";

@Controller('account/user')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) { }

  private readonly logger = new Logger(AccountController.name);

  @Get(':userId')
  getAccount(@Param('userId') userId: number): Observable<AccountResponse> {
    this.logger.log(`get account by user id: ${userId}`)
    return this.accountService.getAccount(userId).pipe(
      tap(account => this.logger.log(`account by user id response: ${JSON.stringify(account)}`))
    )
  }

  @Post(':userId')
  createAccount(@Param('userId') userId: number): Observable<AccountResponse> {
    this.logger.log(`create account for user id: ${userId}`)
    return this.accountService.createAccount(userId).pipe(
      tap(account => this.logger.log(`account created for user id: ${JSON.stringify(account)}`))
    )
  }
}