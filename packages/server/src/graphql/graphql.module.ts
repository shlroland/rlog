import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(...rest) {
        console.log(rest, join(process.cwd(), 'src/schema.gql'))
        return {
          // typePaths: ['./**/*.gql'],
          context: ({ req, res }) => ({ req, res }),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }
      },
    }),
  ],
})
export class GraphqlModule {}
