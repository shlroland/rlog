import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { Post, PostDocument } from './schemas/post.schema'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  private async getTotalCount(): Promise<number> {
    return this.postModel.countDocuments()
  }

  public async create(postInput: CreatePostInput) {
    console.log(postInput)
    return this.postModel.create(postInput)
  }
}
