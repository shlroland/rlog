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

  public async release(postInput: CreatePostInput) {
    const createdAt = new Date()
    const updatedAt = new Date()
    const { _id, ...rest } = postInput
    Object.assign(rest, { updatedAt, createdAt })
    return this.findByIdAndUpsert(_id, rest)
  }

  public async draft(draftInput: DraftPostInput) {
    const { _id, ...rest } = draftInput
    const updatedAt = new Date()
    Object.assign(rest, { updatedAt })
    return this.findByIdAndUpsert(_id, rest)
  }

  private async findByIdAndUpsert<T>(id: string, input: T) {
    return this.postModel.findByIdAndUpdate(id, input, {
      upsert: true,
      new: true,
    })
  }
}
