declare module 'hard-source-webpack-plugin' {
  import { Plugin } from 'webpack'

  interface HardSourceWebpackPluginOptions {
    cacheDirectory?: string
    recordsPath?: string
    configHash?: (webpackConfig: string) => string
    environmentHash?: {
      root?: string
      directories?: string[]
      files?: string[]
    }
  }

  namespace HardSourceWebpackPlugin {

  }

  class HardSourceWebpackPlugin extends Plugin {
    constructor(options?: HardSourceWebpackPluginOptions)
  }

  export = HardSourceWebpackPlugin
}
