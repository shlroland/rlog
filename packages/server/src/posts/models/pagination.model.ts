import { ObjectType, Field, Int } from '@nestjs/graphql'
import { PostItemModel } from './post.model'

@ObjectType()
export class PaginationPostItem {
  @Field(() => Int)
  public readonly total: number

  @Field(() => Int)
  public readonly current: number

  @Field(() => Int)
  public readonly pageSize: number

  @Field(() => [PostItemModel])
  public readonly items: PostItemModel[]
}
