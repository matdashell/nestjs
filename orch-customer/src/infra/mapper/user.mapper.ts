import { Injectable } from "@nestjs/common";
import { AccountResponse } from "src/api-client/account/generated";
import { UserCreateRequest, UserResponse } from "src/api-client/user/generated";
import { CustomerCreateRequest } from "src/infra/domain/request/customer.create-request";
import { CustomerResponse } from "../domain/response/customer.response";

@Injectable()
export class CustomerMapper {
  userAndAccountToUserResponseController(
    user: UserResponse,
    account: AccountResponse): CustomerResponse {
    return {
      ...user,
      accountId: account.id,
    }
  }

  customerToUserRequest(customer: CustomerCreateRequest): UserCreateRequest {
    return {
      ...customer
    }
  }
}