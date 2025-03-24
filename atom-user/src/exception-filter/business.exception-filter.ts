import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { BusinessException } from "src/exception/business.exception";

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(BusinessException.name)

  catch(exception: BusinessException, host: ArgumentsHost) {
    this.logger.error(`BusinessException - ${exception.getResponse()}`)
    host.switchToHttp().getResponse<Response>()
      .status(exception.getStatus())
      .json({
        status: exception.getStatus(),
        message: exception.getResponse()
      })
  }
}