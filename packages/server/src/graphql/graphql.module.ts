import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { isDev } from 'src/utils/env'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      async useFactory() {
        return {
          debug: isDev(),
          playground: isDev(),
          context: ({ req, res }) => ({ req, res }),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }
      },
    }),
  ],
})
export class GraphqlModule {}
