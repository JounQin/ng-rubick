import _debug from 'debug'
import Koa, { Middleware } from 'koa'
import compose from 'koa-compose'
import compress from 'koa-compress'
import logger from 'koa-logger'
import staticCache from 'koa-static-cache'

import { serverHost, serverPort } from '../build/config'

const debug = _debug('rb:server')

const app = new Koa()

const middlewares: Middleware[] = [
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
  require('./dev').default.then((middleware: Middleware) => app.use(middleware))
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
