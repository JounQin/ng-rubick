import { AngularCompilerPlugin } from '@ngtools/webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import {
  NODE_ENV,
  ROUTE_BASE,
  __DEV__,
  resolve,
  serverHost,
  serverPort,
} from './config'

const sourceMap = __DEV__

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: !__DEV__,
      sourceMap,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap,
    },
  },
]

export default {
  entry: {
    app: ['styles/app.scss', 'zone.js', './src/index.ts'],
  },
  output: {
    publicPath: __DEV__ ? `http://${serverHost}:${serverPort}/` : '',
    path: resolve('dist'),
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  mode: NODE_ENV,
  resolve: {
    alias: {
      lodash$: 'lodash-es',
    },
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
        test: /\.component\.scss$/,
        use: ['exports-loader?module.exports.toString()', ...cssLoaders],
      },
      {
        test: /\.scss$/,
        exclude: /\.component\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
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
      I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
      ROUTE_BASE: JSON.stringify(ROUTE_BASE),
    }),
    new AngularCompilerPlugin({
      tsConfigPath: resolve('tsconfig.json'),
      entryModule: resolve('src/views/app.module#AppModule'),
      sourceMap: true,
      compilerOptions: {
        disableTypeScriptVersionCheck: true,
      },
    }),
    new ExtractTextWebpackPlugin({
      filename: 'app.[contenthash].js',
      disable: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      chunksSortMode: 'none',
    }),
  ],
  performance: {
    hints: false,
  },
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
