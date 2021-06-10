import { Args, Resolver, ID, Query, Mutation } from '@nestjs/graphql'
import { CreatePostInput } from './dtos/create-post.input'
import { DraftPostInput } from './dtos/draft-post.input'
import { PostItemModel } from './models/post.model'
import { PostsService } from './posts.service'
import * as mongoose from 'mongoose'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/utils/guard/gqlAuth.guard'
import { PaginationInput } from './dtos/pagination-post.input'
import { PaginationPostItem } from './models/pagination.model'
@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PaginationPostItem)
  // @UseGuards(GqlAuthGuard)
  public async getPosts(@Args('input') input: PaginationInput) {
    return this.postsService.findByPagination(input)
  }

  @Query(() => PostItemModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findPostById(id)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async release(@Args('input') input: CreatePostInput) {
    return this.postsService.release(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async saveDraft(@Args('input') input: DraftPostInput) {
    if (!input._id) {
      const _id = mongoose.Types.ObjectId().toString()
      Object.assign(input, { _id })
    }
    return this.postsService.draft(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async deletePostById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ) {
    return this.postsService.deleteOneById(id)
  }
}
