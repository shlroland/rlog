import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly username: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly password: string

  // @Field()
  // @IsString()
  // public readonly token: string
}
