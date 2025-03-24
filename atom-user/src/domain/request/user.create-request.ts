import { Matches, Max, MaxLength, Min, MinLength } from "class-validator"

export class UserCreateRequest {
  @MinLength(3)
  @MaxLength(60)
  @Matches('^[\\w]$')
  name: string

  @Min(18)
  @Max(20)
  age: number

  @MinLength(11)
  @MaxLength(14)
  @Matches('^[\\d]$')
  document: string
}