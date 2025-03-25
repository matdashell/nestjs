import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { BusinessException } from "src/exception/business.exception";

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter{

  private readonly logger = new Logger(BusinessExceptionFilter.name);

  catch(exception: BusinessException, host: ArgumentsHost) {
    this.logger.error(`Business exception: ${exception.message}`)
    host.switchToHttp().getResponse()
      .status(exception.getStatus())
      .json({
        status: exception.getStatus(),
        message: exception.getResponse()
      })
  }
}
