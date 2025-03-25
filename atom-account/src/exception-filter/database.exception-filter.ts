import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { ResponseError } from "src/infra/domain/model/response.model";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(`Database exception: ${exception.message}`)
    const response = ResponseError.DATABASE_ERROR
    host.switchToHttp().getResponse<Response>()
      .status(response.status)
      .json({
        ...response
      })
  }
}