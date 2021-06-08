import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { DraftPostInput } from './dtos/draft-post.input'
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

  public async draft(draftInput: DraftPostInput) {
    const { _id, ...rest } = draftInput
    const updatedAt = new Date()
    return this.postModel.findByIdAndUpdate(
      _id,
      Object.assign(rest, { updatedAt }),
      { upsert: true, new: true },
    )
  }
}
