import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../database/entity/account.entity";
import { AccountResponse } from "../domain/response/account.response";

@Injectable()
export class AccountMapper {
  entityToDomain(entity: AccountEntity): AccountResponse {
    return {
      ...entity
    } as AccountResponse
  }

  requestToDomain(userId: number): AccountEntity {
    return {
      userId: userId,
      balance: 500
    } as AccountEntity
  }
}