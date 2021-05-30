import { Resolver, Query, Args } from '@nestjs/graphql'
import { UserModel } from 'src/user/models/user.model'
import { AuthService } from './auth.service'
import { LoginInput } from './dtos/login.input'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserModel)
  public async login(@Args('input') input: LoginInput) {
    return this.authService.login(input)
  }
}
