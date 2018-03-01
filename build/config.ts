import path from 'path'

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const __DEV__ = NODE_ENV === 'development'

export const serverHost = process.env.HOST || 'localhost'

export const serverPort = +process.env.PORT || 4000

export const resolve = (...args: string[]) =>
  path.resolve(process.cwd(), ...args)
