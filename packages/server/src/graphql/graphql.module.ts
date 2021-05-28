import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule, GraphQLModule.forRootAsync({})],
})
export class GraphqlModule {}
