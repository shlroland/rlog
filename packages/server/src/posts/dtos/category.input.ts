import { Field, ID, InputType } from '@nestjs/graphql'
import { IsAlpha, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpsertCategoryInput {
  @Field(() => ID, { nullable: true })
  public readonly _id: string

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
