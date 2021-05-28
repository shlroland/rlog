import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'

@Module({
  imports: [ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
