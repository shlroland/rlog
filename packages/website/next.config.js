/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
/** @type {import('next/dist/next-server/server/config').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    return config
  },
  future: {
    webpack5: true,
  },
}

module.exports = withPlugins([[withImages]], nextConfig)
