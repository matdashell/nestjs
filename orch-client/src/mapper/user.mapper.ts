import { Injectable } from "@nestjs/common";
import { AccountResponse } from "src/api-client/account/generated";
import { UserCreateRequest, UserResponse } from "src/api-client/user/generated";
import { CustomerCreateRequest } from "../domain/customerCreateRequest.domain";
import { CustomerResponse } from "../domain/customerResponse.domain";

@Injectable()
export class CustomerMapper {
  userAndAccountToUserResponseController(
    user: UserResponse,
    account: AccountResponse): CustomerResponse {
    return ({
      id: user.id,
      accountId: account.id,
      age: user.age,
      document: user.document,
      name: user.name
    })
  }

  customerToUserRequest(customer: CustomerCreateRequest): UserCreateRequest {
    return ({
      name: customer.name,
      age: customer.age,
      document: customer.document
    })
  }
}