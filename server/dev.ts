import koaWebpack from 'koa-webpack'
import webpack from 'webpack'

import config from '../build/webpack.config'

export default koaWebpack({ compiler: webpack(config) })
