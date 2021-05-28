import * as path from 'path'

export const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV
  const pwd = process.cwd()
  const pathResolve = (env = '') => {
    return path.resolve(pwd, 'env', `.env${env ? `.${env}` : ''}`)
  }
  return [pathResolve(nodeEnv), pathResolve()]
}
