import { AngularCompilerPlugin } from '@ngtools/webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin'
import webpack, { Configuration } from 'webpack'

import {
  __DEV__,
  HASH_MODE,
  hashType,
  NODE_ENV,
  resolve,
  ROUTE_BASE,
} from './config'

const sourceMap = __DEV__

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
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
    app: [
      'normalize.css/normalize.css',
      'font-awesome/css/font-awesome.css',
      'styles/app.scss',
      'zone.js',
      './src',
    ],
  },
  output: {
    publicPath: ROUTE_BASE,
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
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          root: resolve('src/assets'),
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: resolve('src/assets'),
            },
          },
          'pug-plain-loader',
        ],
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.component\.scss$/,
            use: ['exports-loader?module.exports.toString()', ...cssLoaders],
          },
          {
            use: [MiniCssExtractPlugin.loader, ...cssLoaders],
          },
        ],
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
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'initial',
          test: /node_modules/,
        },
      },
    },
  },
}

export default config
