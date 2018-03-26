import { AngularCompilerPlugin } from '@ngtools/webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { Configuration } from 'webpack'

import {
  HASH_MODE,
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
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss'),
      ],
    },
  },
]

const config: Configuration = {
  entry: {
    app: ['styles/app.scss', 'zone.js', 'rx.shims', './src'],
  },
  output: {
    publicPath: __DEV__ ? `http://${serverHost}:${serverPort}/` : ROUTE_BASE,
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
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          root: resolve('src/assets'),
        },
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-plain-loader'],
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
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 8,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
      I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
      HASH_MODE,
      ROUTE_BASE: JSON.stringify(ROUTE_BASE),
    }),
    new AngularCompilerPlugin({
      tsConfigPath: resolve('tsconfig.aot.json'),
      entryModule: resolve('src/views/app.module#AppModule'),
      sourceMap,
      compilerOptions: {
        disableTypeScriptVersionCheck: true,
      },
    }),
    new ExtractTextWebpackPlugin({
      filename: 'app.[contenthash].js',
      disable: true,
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.ico',
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
      chunks: 'initial',
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
}

export default config
