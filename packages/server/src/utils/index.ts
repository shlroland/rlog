import { ConfigService } from '@nestjs/config'
import * as path from 'path'
import * as bcrypt from 'bcrypt'

export const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV
  const pwd = process.cwd()
  const pathResolve = (env = '') => {
    return path.resolve(pwd, 'env', `.env${env ? `.${env}` : ''}`)
  }
  return [pathResolve(nodeEnv), pathResolve()]
}

export const getMongoUri = (configService: ConfigService) => {
  const prefix = configService.get('DATABASE_PREFIX') || 'mongodb://'
  const host = configService.get('DATABASE_HOST')
  const userName = configService.get('DATABASE_USER')
  const userPwd = configService.get('DATABASE_PWD')
  const collection = configService.get('DATABASE_COLLECTION')
  let port = configService.get('DATABASE_PORT')
  let params = configService.get('DATABASE_PARAMS')
  const auth = `${userName}:${userPwd}@`
  port = port ? `:${port}` : ''
  params = params ? `?${params}` : ''
  const connection = `${host}${port}/${collection}${params}`
  return `${prefix}${auth}${connection}`
}

export const SALT_WORK_FACTOR = 10
export const encryptPassword = (password: string) =>
  bcrypt.hashSync(password, SALT_WORK_FACTOR)
