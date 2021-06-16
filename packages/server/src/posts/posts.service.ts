import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ForbiddenError } from 'apollo-server-express'
import { Model } from 'mongoose'
import { UpsertCategoryInput } from './dtos/category.input'
import { CreatePostInput } from './dtos/create-post.input'
import { DraftPostInput } from './dtos/draft-post.input'
import { PaginationInput } from './dtos/pagination-post.input'
import { UpsertTagInput } from './dtos/tag.input'
import { Category } from './schemas/category.schema'
import { Post } from './schemas/post.schema'
import { Tag } from './schemas/tag.schema'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(Tag.name)
    private tagModel: Model<Tag>,
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
      .populate('category')
      .populate('tags')
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
    return this.postModel.findById(id).populate('category').populate('tags')
  }

  public async deleteOneById(id: string) {
    return this.postModel.findByIdAndDelete(id)
  }

  public async upsertCategory(input: UpsertCategoryInput) {
    const { _id, ...rest } = input
    if (_id) {
      return this.categoryModel.findByIdAndUpdate(_id, rest, {
        new: true,
      })
    } else {
      const hadCategory = await this.categoryModel.findOne({
        $or: [{ name: input.name }, { input: input.label }],
      })
      if (hadCategory) {
        throw new ForbiddenError('The Category already exists')
      }
      return this.categoryModel.create(rest)
    }
  }

  public async findCategory() {
    return await this.categoryModel.find({})
  }

  public async deleteCategory(id: string) {
    return await this.categoryModel.findByIdAndDelete(id)
  }

  public async upsertTag(input: UpsertTagInput) {
    const { _id, ...rest } = input
    if (_id) {
      return this.tagModel.findByIdAndUpdate(_id, rest, {
        new: true,
      })
    } else {
      const hadTag = await this.tagModel.findOne({
        $or: [{ name: input.name }, { input: input.label }],
      })
      if (hadTag) {
        throw new ForbiddenError('The Tag already exists')
      }
      return this.tagModel.create(rest)
    }
  }

  public async findTag() {
    return await this.tagModel.find({})
  }

  public async deleteTag(id: string) {
    return await this.tagModel.findByIdAndDelete(id)
  }

  private async findByIdAndUpsert<T>(id: string, input: T) {
    return this.postModel.findByIdAndUpdate(id, input, {
      upsert: true,
      new: true,
    })
  }
}
