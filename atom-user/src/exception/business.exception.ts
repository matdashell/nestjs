import { HttpException } from "@nestjs/common";
import { ResponseModel } from "src/infra/domain/model/response.model";

export class BusinessException extends HttpException {
  constructor(errorResponse: ResponseModel) {
    super(errorResponse.message, errorResponse.status)
  }
}