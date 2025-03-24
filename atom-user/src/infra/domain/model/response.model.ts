export class ResponseModel {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) { }
}

export const ResponserError = {
  DATABASE_ERROR: new ResponseModel(500, 'Internal database error'),
  DOCUMENT_ERROR: new ResponseModel(400, 'Invalid user document'),
  USER_EXISTS_ERROR: new ResponseModel(400, 'Document user already exists in the system'),
  USER_NOT_FOUND_ERROR: new ResponseModel(404, 'User not found by id'),
}