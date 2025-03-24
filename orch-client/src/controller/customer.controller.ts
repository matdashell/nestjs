import { Body, Controller, Get, Logger, Param, Post, UseFilters } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { UserResponse } from "../api-client/user/generated";
import { CustomerCreateRequest } from "../domain/customerCreateRequest.domain";
import { HttpExceptionFilter } from "../handler/http.exception-filter";
import { CustomerService } from "../service/customer.service";

@Controller("customers")
@UseFilters(HttpExceptionFilter)
export class CustomerController {
  constructor(
    private readonly orchestratorService: CustomerService
  ) { }

  private readonly logger = new Logger(CustomerController.name)

  @Get(':customerId')
  getCustomer(@Param('customerId') userId: number): Observable<UserResponse> {
    this.logger.log(`getting customer by id ${userId}`)
    return this.orchestratorService.getCustomer(userId).pipe(
      tap(response => this.logger.log(`get customer by id response ${response}`))
    )
  }

  @Post()
  postCustomer(@Body() userCreate: CustomerCreateRequest): Observable<UserResponse> {
    this.logger.log(`creating customer by request ${userCreate}`)
    return this.orchestratorService.postCustomer(userCreate).pipe(
      tap(response => this.logger.log(`create customer response ${response}`))
    )
  }
}