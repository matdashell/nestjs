import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    host.switchToHttp().getResponse<Response>()
      .status(500)
      .json({
        statusCode: 500,
        message: 'Unexpected Error' + exception
      })
  }
}