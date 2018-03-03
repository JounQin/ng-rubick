export interface Context<T = any> {
  keys: () => string[]
  (key: string): T
}
