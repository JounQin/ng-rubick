import { AngularCompilerPlugin } from '@ngtools/webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin'
import webpack, { Configuration } from 'webpack'

import {
  HASH_MODE,
  NODE_ENV,
  ROUTE_BASE,
  __DEV__,
  hashType,
  resolve,
  serverHost,
  serverPort,
} from './config'

const sourceMap = __DEV__

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: !__DEV__ && {
        discardComments: {
          removeAll: true,
        },
      },
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
    app: ['styles/app.scss', 'zone.js', './src'],
  },
  output: {
    publicPath: __DEV__ ? `http://${serverHost}:${serverPort}/` : ROUTE_BASE,
    path: resolve('dist'),
    filename: `[name].[${hashType}].js`,
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
        use: [MiniCssExtractPlugin.loader, ...cssLoaders],
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
    } as any),
    new MiniCssExtractPlugin({
      filename: `[name].[${hashType}].css`,
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
    minimize: !__DEV__,
    minimizer: [
      new UglifyJsWebpackPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      name: 'vendors',
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: ({ context }) => /node_modules/.test(context),
        },
      },
    },
  },
}

export default config
