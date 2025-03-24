import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable, of, switchMap, throwError } from "rxjs";
import { BusinessException } from "src/exception/business.exception";
import { ResponserError } from "src/infra/domain/model/response.model";
import { Repository } from "typeorm";
import { UserCreateRequest } from "../../domain/request/user.create-request";
import { UserMapper } from "../../mapper/user.mapper";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly userMapper: UserMapper
  ) { }

  create(userRequest: UserCreateRequest): Observable<UserEntity> {
    const entity = this.userMapper.requestToEntity(userRequest)
    return from(this.repository.save(entity))
  }

  findOneById(userId: number): Observable<UserEntity> {
    return from(this.repository.findOneBy({ id: userId })).pipe(
      switchMap(entity => {
        if (!entity) return throwError(() => new BusinessException(ResponserError.USER_NOT_FOUND_ERROR))
        return of(entity)
      })
    )
  }

  existsByDocument(document: string): Observable<boolean> {
    return from(this.repository.existsBy({
      document: document
    }))
  }
}