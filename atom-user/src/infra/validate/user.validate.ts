import { Injectable, Logger } from "@nestjs/common";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { BusinessException } from "src/exception/business.exception";
import { ResponserError } from "../domain/model/response.model";
import { UserRepository } from "../database/repository/user.repository";
import { map, Observable, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserValidator {

  constructor(
    private readonly repository: UserRepository
  ) { }

  private readonly logger = new Logger(UserValidator.name)

  validDocument(document: string): void {
    this.logger.log(`validating document ${document}`)
    const validator = document.length > 11
      ? cnpj
      : cpf

    if (!validator.isValid(document)) {
      throw new BusinessException(ResponserError.DOCUMENT_ERROR)
    }
  }

  validCreate(document: string): Observable<void> {
    this.logger.log(`validating unique document ${document}`)
    return this.repository.existsByDocument(document).pipe(
      tap(exists => { if (exists) throw new BusinessException(ResponserError.USER_EXISTS_ERROR) }),
      map(() => undefined)
    )
  }
}