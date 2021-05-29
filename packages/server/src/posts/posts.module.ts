import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'
import { Post, PostSchema } from './schemas/post.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
