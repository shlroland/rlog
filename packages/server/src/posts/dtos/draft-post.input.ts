import { InputType, Field } from '@nestjs/graphql'
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsArray,
  IsEnum,
} from 'class-validator'
import { ARTICLE_STATUS } from './create-post.input'
import { IsObjectId } from 'class-validator-mongo-object-id'

@InputType()
export class DraftPostInput {
  @Field({ nullable: true })
  //   @IsObjectId()
  public readonly _id?: string

  @Field({ nullable: true })
  @IsString()
  public readonly excerpt: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isRecommended: boolean

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isCommentable: boolean

  @Field({ nullable: true })
  // @Is()
  @IsString()
  public readonly category: string

  @Field(() => [String], { nullable: true })
  @IsArray()
  public readonly tags: string[]

  @Field({ nullable: true })
  @IsString()
  public readonly title: string

  @Field({ nullable: true })
  @IsString()
  public readonly content: string

  @Field({ nullable: true })
  @IsString()
  public readonly html: string

  @Field({ nullable: true })
  @IsString()
  @IsEnum(ARTICLE_STATUS)
  public readonly articleStatus: string
}
