import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
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
        test: /\.pug/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.ts$/,
        use: [
          // {
          //   loader: 'awesome-typescript-loader',
          //   options: {
          //     useCache: true,
          //     forceIsolatedModules: true,
          //     reportFiles: ['src/**/*.ts'],
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
              },
            },
          },
          'angular2-template-loader',
          {
            loader: 'angular-router-loader',
            options: {
              loader: 'import',
            },
          },
        ],
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular[\\|/]core/),
    new webpack.DefinePlugin({
      __DEV__,
    }),
    new HardSourceWebpackPlugin(),
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
}
