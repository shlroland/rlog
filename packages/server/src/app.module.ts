import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AppService, AuthService],
})
export class AppModule {}
