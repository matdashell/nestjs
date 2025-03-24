import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { ResponserError } from "src/infra/domain/model/response.model";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(DatabaseExceptionFilter.name)

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    this.logger.error(`QueryFailedError - ${exception.message}`)
    const response = ResponserError.DATABASE_ERROR
    host.switchToHttp().getResponse<Response>()
      .status(response.status)
      .json({
        status: response.status,
        message: response.message
      })
  }
}