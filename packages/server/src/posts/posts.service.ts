import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { Model } from 'mongoose'
import { CreateCategoryInput } from './dtos/create-category.input'
import { CreatePostInput } from './dtos/create-post.input'
import { DraftPostInput } from './dtos/draft-post.input'
import { PaginationInput } from './dtos/pagination-post.input'
import { Category } from './schemas/category.schema'
import { Post } from './schemas/post.schema'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

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

  public async findByPagination(input: PaginationInput) {
    const { current, pageSize, title, articleStatus } = input
    const params = {}
    title && Reflect.set(params, 'title', { $regex: title, $options: 'i' })
    articleStatus && Reflect.set(params, 'articleStatus', articleStatus)
    const items = await this.postModel
      .find(params)
      .sort({ createdAt: -1 })
      .skip((current - 1) * pageSize)
      .limit(pageSize)

    const total = items.length

    return {
      total,
      current,
      pageSize,
      items,
    }
  }

  public async findPostById(id: string) {
    return this.postModel.findById(id)
  }

  public async deleteOneById(id: string) {
    return this.postModel.findByIdAndDelete(id)
  }

  public async createCategory(input: CreateCategoryInput) {
    const hadCategory = await this.categoryModel.findOne({ name: input.name })
    if (hadCategory) {
      throw new ForbiddenError('Category ' + input.name + ' already exists')
    }
    return this.categoryModel.create(input)
  }

  public async findCategory() {
    return await this.categoryModel.find({})
  }

  public async deleteCategory(id: string) {
    return await this.categoryModel.findByIdAndDelete(id)
  }

  private async findByIdAndUpsert<T>(id: string, input: T) {
    return this.postModel.findByIdAndUpdate(id, input, {
      upsert: true,
      new: true,
    })
  }
}
