import { Module } from "@nestjs/common";
import { AccountModule } from "./api-client/account/account.module";
import { UserModule } from "./api-client/user/user.module";
import { CustomerController } from "./controller/customer.controller";
import { CustomerMapper } from "./mapper/user.mapper";
import { CustomerService } from "./service/customer.service";

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
export class AppModule {}