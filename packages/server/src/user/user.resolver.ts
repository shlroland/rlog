import { Resolver, Query, Args } from '@nestjs/graphql'
import { UserModel } from './models/user.model'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  private getUserInfo(@Args('userId') userId: string) {
    return this.userService.findOneById(userId)
  }
}
