export class ResponseModel {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) { }
}

export const ResponseError = {
  DATABASE_ERROR: new ResponseModel(500, 'Internal database error'),
  ACCOUNT_NOT_FOUND_ERROR: new ResponseModel(404, 'User not found by id'),
  ACCOUNT_ALREADY_EXISTS_ERROR: new ResponseModel(409, 'User already exists')
}