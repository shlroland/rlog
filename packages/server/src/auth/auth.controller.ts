import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}
  @Get()
  find() {
    const dbUser = this.configService.get<string>('DATABASE_USER')
    console.log(dbUser)
    return dbUser
  }
}
