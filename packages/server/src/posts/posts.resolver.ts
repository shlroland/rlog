import { Args, Resolver, ID, Query, Mutation } from '@nestjs/graphql'
import { CreatePostInput } from './dtos/create-post.input'
import { PostItemModel } from './models/post.model'
import { PostsService } from './posts.service'

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostItemModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return {
      id,
      content: '12333',
    }
  }

  @Mutation(() => PostItemModel)
  public async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input)
  }
}
