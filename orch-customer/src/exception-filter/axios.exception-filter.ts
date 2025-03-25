import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from "express";
import { ResponseError, ResponseModel } from "src/infra/domain/model/response.model";

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(AxiosExceptionFilter.name)

  catch(exception: AxiosError, host: ArgumentsHost) {
    this.logger.error(`axios exception filter ${exception.message}`)

    const dataResponse = exception.response?.data
    const response = dataResponse
      ? dataResponse as ResponseModel
      : ResponseError.REQUEST_ERROR

    host.switchToHttp().getResponse<Response>()
      .status(response.status)
      .json({
        ...response
      })
  }
}