import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
// import { GraphqlModule } from './graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';
import { configObject } from './config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(configObject())],
  providers: [AuthService],
})
export class AppModule {}
