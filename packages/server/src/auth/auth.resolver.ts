import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserModel } from 'src/user/models/user.model'
import { AuthService } from './auth.service'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserModel)
  public async login(@Args('input') input: LoginInput) {
    return this.authService.login(input)
  }

  @Mutation(() => UserModel)
  public async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input)
  }
}
