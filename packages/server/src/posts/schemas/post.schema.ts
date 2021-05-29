import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Post extends Document {
  @Prop()
  posterUrl: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  summary: string

  @Prop({ required: true })
  content: string

  @Prop({ type: [String], required: true })
  tags: string[]

  @Prop({ required: true })
  lastModifiedDate: Date

  @Prop({ required: true, default: 0 })
  like: number

  @Prop({ required: true, default: 0 })
  pv: number

  @Prop({ required: true, default: true })
  isPublic: boolean
}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post)
