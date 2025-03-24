import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>): Observable<any>{

      const request = context.switchToHttp().getRequest()
      request.headers['Authorization'] = 'Bearer axz'
      return next.handle()
  }
}