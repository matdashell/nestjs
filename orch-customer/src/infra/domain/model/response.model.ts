export class ResponseModel {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) { }
}

export const ResponseError = {
  REQUEST_ERROR: new ResponseModel(500, 'Unexpected internal request error')
}