/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nextConfig = {
  webpack: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    return config
  },
}

module.exports = withPlugins([[withImages]], nextConfig)
