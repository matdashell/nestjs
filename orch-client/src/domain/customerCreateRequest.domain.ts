import { Matches, Max, MaxLength, Min, MinLength } from "class-validator"

export class CustomerCreateRequest {
  @MinLength(3)
  @MaxLength(60)
  @Matches('^[\\w]$')
  name?: string

  @Min(18)
  @Max(80)
  age?: number

  @MinLength(11)
  @MaxLength(14)
  @Matches('^[\\d]$')
  document?: string
}