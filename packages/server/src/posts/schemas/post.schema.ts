import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  excerpt: string

  @Prop({ required: true })
  isRecommended: boolean

  @Prop({ required: true })
  isCommentable: boolean

  @Prop({ required: true })
  category: string

  @Prop({ type: [String], required: true })
  tags: string[]

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  html: string

  @Prop({ required: true })
  articleStatus: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
