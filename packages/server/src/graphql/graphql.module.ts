import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { isDev } from 'src/utils/env'
import { ValidationError } from 'apollo-server-express'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        return {
          debug: isDev(),
          playground: isDev(),
          context: ({ req, res }) => ({ req, res }),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          formatError(error: ValidationError) {
            const {
              message,
              extensions: { code },
            } = error
            return isDev()
              ? {
                  code,
                  message,
                  timestamp: new Date(),
                }
              : error
          },
        }
      },
    }),
  ],
})
export class GraphqlModule {}
