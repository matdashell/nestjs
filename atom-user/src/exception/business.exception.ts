import { HttpException } from "@nestjs/common";
import { ResponseModel } from "src/domain/model/response.model";

export class BusinessException extends HttpException {
  constructor(errorResponse: ResponseModel) {
    super(errorResponse.message, errorResponse.status)
  }
}