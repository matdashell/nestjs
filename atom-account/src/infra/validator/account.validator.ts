import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../database/repository/account.repository";
import { map, Observable, tap } from "rxjs";
import { BusinessException } from "src/exception/business.exception";
import { ResponseError } from "../domain/model/response.model";

@Injectable()
export class AccountValidator {
  constructor(
    private readonly accountRepository: AccountRepository
  ) { }

  validateCreate(userId: number): Observable<void> {
    return this.accountRepository.existsByUserId(userId).pipe(
      tap(exists => {if (exists) throw new BusinessException(ResponseError.ACCOUNT_ALREADY_EXISTS_ERROR)}),
      map(() => undefined)
    )
  }
}