import { Module } from "@nestjs/common";
import { AccountModule } from "./api-client/account/account.module";
import { UserModule } from "./api-client/user/user.module";
import { CustomerController } from "./infra/controller/customer.controller";
import { CustomerMapper } from "./infra/mapper/user.mapper";
import { CustomerService } from "./infra/service/customer.service";

@Module({
  imports: [
    AccountModule,
    UserModule
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerMapper
  ]
})
export class AppModule { }