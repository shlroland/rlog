import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

const PassPortModule = PassportModule.register({
  defaultStrategy: 'jwt',
})
@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassPortModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      async useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_TIME') },
        }
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, PassPortModule],
})
export class AuthModule {}
