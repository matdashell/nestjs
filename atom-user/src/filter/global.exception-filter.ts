import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    host.switchToHttp().getRequest<Response>()
      .status(500)
      .json({
        status: 500,
        message: exception
      })
  }
}