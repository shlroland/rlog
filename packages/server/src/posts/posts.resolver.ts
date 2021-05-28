import { Args, Resolver, ID, Query } from '@nestjs/graphql'
import { PostItemModel } from './models/post.model'

@Resolver()
export class PostsResolver {
  @Query(() => PostItemModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return {
      id,
      content: '12333',
    }
  }
}
