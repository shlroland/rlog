import { Module } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [AuthService],
})
export class AppModule {}
