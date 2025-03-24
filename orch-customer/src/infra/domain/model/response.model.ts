export class ResponseModel {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) { }
}

export const ResponserError = {
  INTERNAL_ERROR: new ResponseModel(500, 'Internal server error'),
}