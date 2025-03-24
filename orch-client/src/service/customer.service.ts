import { Injectable, Logger } from "@nestjs/common";
import { map, Observable, switchMap, tap } from "rxjs";
import { AccountService } from "../api-client/account/generated";
import { UserService } from "../api-client/user/generated";
import { CustomerCreateRequest } from "../domain/customerCreateRequest.domain";
import { CustomerResponse } from "../domain/customerResponse.domain";
import { CustomerMapper } from "../mapper/user.mapper";

@Injectable()
export class CustomerService {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly userMapper: CustomerMapper
  ) { }

  private readonly logger = new Logger(CustomerService.name)

  getCustomer(customerId: number): Observable<CustomerResponse> {
    return this.userService.getUserById(customerId).pipe(
      tap(response => this.logger.log(`getUserById response ${JSON.stringify(response)}`)),

      switchMap(({ data: user }) => this.accountService.getAccountByUserId(user.id as number).pipe(
        tap(response => this.logger.log(`getAccountByUserId response ${JSON.stringify(response)}`)),
        map(({ data: account }) => this.userMapper.userAndAccountToUserResponseController(user, account)
        ))
      ))
  }

  postCustomer(customerCreate: CustomerCreateRequest): Observable<CustomerResponse> {
    const userCreateRequest = this.userMapper.customerToUserRequest(customerCreate)
    return this.userService.postUser(userCreateRequest).pipe(
      tap(response => this.logger.log(`postUser response ${JSON.stringify(response)}`)),

      switchMap(({ data: user }) => this.accountService.postAccount(user.id as number).pipe(
        tap(response => this.logger.log(`postAccount response ${JSON.stringify(response)}`)),
        map(({ data: account }) => this.userMapper.userAndAccountToUserResponseController(user, account)
        ))
      ))
  }
}