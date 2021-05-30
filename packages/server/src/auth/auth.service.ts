import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { UserService } from 'src/user/user.service'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validdateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)
    if (user) {
      return user
    }
    throw new AuthenticationError(
      'Your username and password do not match. Please try again!',
    )
  }

  public async login(input: LoginInput) {
    const {} = input
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
