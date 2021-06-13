import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CategoryModel } from './category.model'
import { TagModel } from './tag.model'

@ObjectType()
export class PostItemModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly excerpt: string

  @Field()
  public readonly isRecommended: boolean

  @Field()
  public readonly isCommentable: boolean

  @Field(() => CategoryModel)
  public readonly category: {
    _id: string
    name: string
  }

  @Field(() => [TagModel])
  public readonly tags: {
    _id: string
    name: string
  }[]

  @Field()
  public readonly title: string

  @Field()
  public readonly content: string

  @Field()
  public readonly html: string

  @Field()
  public readonly articleStatus: string

  @Field({ nullable: true })
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
