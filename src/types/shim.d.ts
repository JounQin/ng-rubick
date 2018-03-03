interface NodeModule {
  hot: {
    accept: () => {}
  }
}

interface NodeRequire {
  <T = any>(path: string): T
  (paths: string[], callback: (...modules: any[]) => void): void
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ) => any
  ensure: (
    paths: string[],
    callback: (require: <T = any>(path: string) => T) => void,
  ) => void
}

declare const __DEV__: boolean

declare const I18N_REGEX: RegExp
declare const ROUTE_BASE: string
