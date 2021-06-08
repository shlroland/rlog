import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { Post } from './schemas/post.schema'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
  ) {}

  private async getTotalCount(): Promise<number> {
    return this.postModel.countDocuments()
  }

  public async create(postInput: CreatePostInput) {
    const createdAt = new Date()
    const updatedAt = new Date()
    return this.postModel.create(
      Object.assign(postInput, { createdAt, updatedAt }),
    )
  }
}
