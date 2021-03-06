import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HookNextFunction, Types } from 'mongoose'
import type { ObjectId } from 'mongoose'
import { encryptPassword } from 'src/utils'

@Schema()
export class User extends Document {
  @Prop(raw({ type: Types.ObjectId }))
  userId: string | ObjectId

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  createdAt: Date
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre('save', function (next: HookNextFunction) {
  this.password = encryptPassword(this.password)
  next()
})
