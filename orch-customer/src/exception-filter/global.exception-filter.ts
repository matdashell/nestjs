import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { ResponserError } from "src/infra/domain/model/response.model";

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = ResponserError.INTERNAL_ERROR
    host.switchToHttp().getResponse<Response>()
      .status(response.status)
      .json({ ...response })
  }
}