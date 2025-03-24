import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    host.switchToHttp().getResponse<Response>()
      .status(exception.getStatus())
      .json({
        status: exception.getStatus(),
        message: exception.getResponse()
      })
  }
}