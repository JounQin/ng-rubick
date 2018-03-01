declare module 'koa-static-cache' {
  import { Middleware } from 'koa'

  interface KoaStaticCacheOptions {
    dir?: string
    maxAge?: number
    cacheControl?: string
    buffer?: boolean
    gzip?: boolean
    usePrecompiledGzip?: boolean
    alias?: {}
    prefix?: string
    dynamic?: boolean
    filter?: string[] | ((path: string) => boolean)
    preload?: boolean
    files?: {}
  }

  namespace koaStaticCache {

  }

  function koaStaticCache(
    options: KoaStaticCacheOptions,
    files?: {},
  ): () => Middleware
  function koaStaticCache(
    dir: string,
    options?: KoaStaticCacheOptions,
    files?: {},
  ): () => Middleware

  export = koaStaticCache
}
