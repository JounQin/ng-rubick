import { AngularCompilerPlugin } from '@ngtools/webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import { __DEV__, NODE_ENV, resolve, serverHost, serverPort } from './config'

export default {
  entry: {
    app: ['zone.js', './src/index.ts'],
  },
  output: {
    publicPath: __DEV__ ? `http://${serverHost}:${serverPort}/` : '/',
    path: resolve('dist'),
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  mode: NODE_ENV,
  resolve: {
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'exports-loader?module.exports.toString()',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
    }),
    new AngularCompilerPlugin({
      tsConfigPath: resolve('tsconfig.json'),
      entryModule: resolve('src/views/app.module#AppModule'),
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
  ],
  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all',
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
} as webpack.Configuration
