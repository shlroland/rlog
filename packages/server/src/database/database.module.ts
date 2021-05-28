import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoUri } from 'src/utils'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          uri: getMongoUri(configService),
          useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        }
      },
    }),
  ],
})
export class DatabaseModule {}
