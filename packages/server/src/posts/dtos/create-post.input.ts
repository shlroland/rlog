import { Field, InputType } from '@nestjs/graphql'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export enum ARTICLE_STATUS {
  DRAFT = 'draft',
  RELEASED = 'released',
  HIDDEN = 'hidden',
}

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  public readonly _id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly excerpt: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isRecommended: boolean

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isCommentable: boolean

  @Field()
  // @Is()
  @IsString()
  @IsNotEmpty()
  public readonly category: string

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  public readonly tags: string[]

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly html: string

  @Field()
  @IsString()
  @IsEnum(ARTICLE_STATUS)
  @IsNotEmpty()
  public readonly articleStatus: string
}
