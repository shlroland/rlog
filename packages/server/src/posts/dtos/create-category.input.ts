import { Field, InputType } from '@nestjs/graphql'
import { IsAlpha, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly name: string

  @Field()
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public readonly label: string
}