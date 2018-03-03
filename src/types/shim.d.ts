import { Context } from './webpack'

declare global {
  interface NodeModule {
    hot: {
      accept: () => {}
    }
  }

  interface NodeRequire {
    <T = any>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    context: <T = any>(
      directory: string,
      useSubdirectories: boolean,
      regExp: RegExp,
    ) => Context<T>
    ensure: (
      paths: string[],
      callback: (require: <T = any>(path: string) => T) => void,
    ) => void
  }

  const __DEV__: boolean

  const I18N_REGEX: RegExp
  const ROUTE_BASE: string
}
