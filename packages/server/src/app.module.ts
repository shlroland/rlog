import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
// import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [AuthModule],
  providers: [AuthService],
})
export class AppModule {}
