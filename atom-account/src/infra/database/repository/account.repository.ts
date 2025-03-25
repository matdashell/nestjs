import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable, of, switchMap, throwError } from "rxjs";
import { BusinessException } from "src/exception/business.exception";
import { ResponseError } from "src/infra/domain/model/response.model";
import { AccountMapper } from "src/infra/mapper/account.mapper";
import { Repository } from "typeorm";
import { AccountEntity } from "../entity/account.entity";

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly accountMapper: AccountMapper
  ) { }

  getAccount(userId: number): Observable<AccountEntity> {
    return from(this.accountRepository.findOneBy({
      id: userId
    })).pipe(
      switchMap(account => {
        if (!account) return throwError(() => new BusinessException(ResponseError.ACCOUNT_NOT_FOUND_ERROR))
        return of(account)
      })
    )
  }

  createAccount(userId: number): Observable<AccountEntity> {
    const entity = this.accountMapper.requestToDomain(userId)
    return from(this.accountRepository.save(entity))
  }

  existsByUserId(userId: number): Observable<boolean> {
    return from(this.accountRepository.existsBy({
      userId: userId
    }))
  }
}