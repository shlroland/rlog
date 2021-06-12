import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'
import { Category, CategorySchema } from './schemas/category.schema'
import { Post, PostSchema } from './schemas/post.schema'
import { Tag, TagSchema } from './schemas/tag.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
