import { Module } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { GraphqlModule } from './graphql/graphql.module'
import { PostsModule } from './posts/posts.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'
import { APP_PIPE } from '@nestjs/core'
import { GraphQlValidationPipe } from './pipes/graphql-validation.pipe'
@Module({
  imports: [
    AuthModule,
    ConfigModule,
    GraphqlModule,
    PostsModule,
    DatabaseModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: GraphQlValidationPipe,
    },
  ],
})
export class AppModule {}
