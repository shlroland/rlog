import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { User } from 'src/user/schemas/user.schema'
import { UserService } from 'src/user/user.service'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { isEmail } from 'class-validator'
import { omit } from 'lodash'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJWT(res: User) {
    const { username, email, _id, ...rest } = res.toObject()
    const payload = { username, email, sub: _id }
    return {
      authorization: this.jwtService.sign(payload),
      userId: _id,
      ...omit(rest, ['password']),
    }
  }

  private async validdateUser(username: string, password: string) {
    let user: User
    if (isEmail(username)) {
      user = await this.userService.findOneByEmail(username)
    } else {
      user = await this.userService.findOneByUsername(username)
    }

    if (user) {
      return user
    }

    if (user && this.isValidPassword(password, user.password)) {
      return user
    }

    throw new AuthenticationError(
      'Your username and password do not match. Please try again!',
    )
  }

  private isValidPassword(plainPwd: string, encryptedPwd: string): boolean {
    return bcrypt.compareSync(plainPwd, encryptedPwd)
  }

  public async login(loginInput: LoginInput) {
    const { username, password } = loginInput

    const res = await this.validdateUser(username, password)
    return this.generateJWT(res)
  }

  public async register(registerInput: RegisterInput) {
    const { email, username } = registerInput
    const curUserByEmail = await this.userService.findOneByEmail(email)
    const curUserByUsername = await this.userService.findOneByUsername(username)
    if (curUserByEmail) {
      throw new ForbiddenError(
        'Email has already been used, Please enter another one.',
      )
    } else if (curUserByUsername) {
      throw new ForbiddenError(
        'Username has already been used, Please enter another one.',
      )
    } else {
      const res = await this.userService.create({ ...registerInput })
      return res
    }
  }
}
