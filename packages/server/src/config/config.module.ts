import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { getEnvFilePath } from 'src/utils'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
  ],
})
export class ConfigModule {}
