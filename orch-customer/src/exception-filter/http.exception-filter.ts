import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host.switchToHttp().getResponse<Response>()
      .status(exception.getStatus())
      .json({
        statusCode: exception.getStatus(),
        message: exception.getResponse()
      })
  }
}