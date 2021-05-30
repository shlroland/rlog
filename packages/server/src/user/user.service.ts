import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterInput } from 'src/auth/dtos/register.input'
import { User } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(input: RegisterInput): Promise<User> {
    return this.userModel.create(input)
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email })
  }
  public async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username })
  }
}
