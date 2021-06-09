import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/utils/guard/gqlAuth.guard'
import { UserModel } from './models/user.model'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  private getUserInfo(@Args('userId') userId: string) {
    return this.userService.findOneById(userId)
  }
}
