import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(BadRequestExceptionFilter.name)

  catch(exception: BadRequestException, host: ArgumentsHost) {
    this.logger.error(`BadRequestExceptionFilter - ${exception.cause}`)
    const response = exception.getResponse() as any
    host.switchToHttp().getResponse<Response>()
      .status(exception.getStatus())
      .json({
        status: exception.getStatus(),
        message: response.message
      })
  }
}