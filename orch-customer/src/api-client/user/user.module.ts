import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AuthInterceptor } from "../../interceptor/auth.interceptor";
import { ApiModule, Configuration } from "./generated";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      headers: {}
    }),
    ApiModule.forRoot(() => new Configuration({
      basePath: 'http://localhost:3001'
    }))
  ],
  providers: [AuthInterceptor],
  exports: [ApiModule]
})
export class UserModule {}