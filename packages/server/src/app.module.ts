import { Module } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { GraphqlModule } from './graphql/graphql.module'
import { PostsModule } from './posts/posts.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'
@Module({
  imports: [
    AuthModule,
    ConfigModule,
    GraphqlModule,
    PostsModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
