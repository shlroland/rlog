import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HookNextFunction } from 'mongoose'
import { encryptPassword } from 'src/utils'

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  password: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre('save', function(next: HookNextFunction) {
  this.password = encryptPassword(this.password)
  next()
})
