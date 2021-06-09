import { InputType, Field } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, Min } from 'class-validator'

@InputType()
export class PaginationInput {
  @Field()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  public readonly current: number

  @Field()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  public readonly pageSize: number
}
