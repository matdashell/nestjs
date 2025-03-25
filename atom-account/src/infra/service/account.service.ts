import { Injectable, Logger } from "@nestjs/common";
import { map, Observable, switchMap, tap } from "rxjs";
import { AccountRepository } from "../database/repository/account.repository";
import { AccountResponse } from "../domain/response/account.response";
import { AccountMapper } from "../mapper/account.mapper";
import { AccountValidator } from "../validator/account.validator";

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountMapper: AccountMapper,
    private readonly accountValidator: AccountValidator
  ) { }

  private readonly logger = new Logger(AccountService.name);

  getAccount(userId: number): Observable<AccountResponse> {
    return this.accountRepository.getAccount(userId).pipe(
      tap(entity => this.logger.log(`entity by user id response: ${JSON.stringify(entity)}`)),
      map(entity => this.accountMapper.entityToDomain(entity))
    )
  }

  createAccount(userId: number): Observable<AccountResponse> {
    return this.accountValidator.validateCreate(userId).pipe(
      switchMap(() => this.accountRepository.createAccount(userId)),
      tap(entity => this.logger.log(`entity created response: ${JSON.stringify(entity)}`)),
      map(entity => this.accountMapper.entityToDomain(entity))
    )
  }
}