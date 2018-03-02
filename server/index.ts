import _debug from 'debug'
import Koa from 'koa'
import compose from 'koa-compose'
import compress from 'koa-compress'
import logger from 'koa-logger'
import staticCache from 'koa-static-cache'

import { serverHost, serverPort } from '../build/config'

const debug = _debug('rb:server')

const app = new Koa()

const middlewares: Koa.Middleware[] = [
  logger(),
  compress(),
  (ctx, next) => {
    if (
      ctx.method === 'GET' &&
      ctx.accept.type('html') &&
      !ctx.url
        .split('/')
        .reverse()[0]
        .includes('.')
    ) {
      ctx.url = '/index.html'
    }

    return next()
  },
]

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  middlewares.push(require('./dev').default)
} else {
  middlewares.push(
    staticCache('dist', {
      maxAge: 60 * 60 * 24 * 365,
    }),
  )
}

app.use(compose(middlewares))

app.listen(serverPort, serverHost, () =>
  debug('app start listening on %s:%d', serverHost, serverPort),
)
