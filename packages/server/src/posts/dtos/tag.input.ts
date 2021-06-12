import { Field, ID, InputType } from '@nestjs/graphql'
import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpsertTagInput {
  @Field(() => ID, { nullable: true })
  public readonly _id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly name: string

  @Field()
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  public readonly label: string
}
