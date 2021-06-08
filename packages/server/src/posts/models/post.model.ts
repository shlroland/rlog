import { Field, ID, ObjectType } from '@nestjs/graphql'

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

  @Field()
  public readonly category: string

  @Field(() => [String])
  public readonly tags: string[]

  @Field()
  public readonly title: string

  @Field()
  public readonly content: string

  @Field()
  public readonly html: string

  @Field()
  public readonly articleStatus: string

  // @Field()
  // public readonly isPublic: boolean

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date

  // @Field(() => PostItemModel, { nullable: true })
  // public readonly prev: PostItemModel | null

  // @Field(() => PostItemModel, { nullable: true })
  // public readonly next: PostItemModel | null
}
