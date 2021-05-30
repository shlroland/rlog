import { ConfigService } from '@nestjs/config'
import * as path from 'path'
import * as bcrypt from 'bcrypt'
import { isProd } from './env'

export const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV
  const pwd = process.cwd()
  const pathResolve = (env = '') => {
    return path.resolve(pwd, 'env', `.env${env ? `.${env}` : ''}`)
  }
  return [pathResolve(nodeEnv), pathResolve()]
}

export const getMongoUri = (configService: ConfigService) => {
  const host = configService.get('DATABASE_HOST')
  const port = configService.get('DATABASE_PORT')
  const userName = configService.get('DATABASE_USER')
  const userPwd = configService.get('DATABASE_PWD')
  const collection = configService.get('DATABASE_COLLECTION')

  const prefix = 'mongodb://'
  const auth = `${userName}:${userPwd}@`
  const connection = `${host}:${port}/${collection}`

  return isProd() ? `${prefix}${auth}${connection}` : `${prefix}${connection}`
}

export const SALT_WORK_FACTOR = 10
export const encryptPassword = (password: string) =>
  bcrypt.hashSync(password, SALT_WORK_FACTOR)
