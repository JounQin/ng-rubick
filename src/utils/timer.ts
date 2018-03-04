export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

export const timeout = <T = any>(
  promise: Promise<T>,
  time: number,
  error?: any,
) =>
  new Promise((resolve, reject) => {
    let resolved: boolean

    setTimeout(() => {
      if (!resolved) {
        reject(error)
      }
    }, time)

    return promise.then(result => {
      resolved = true
      resolve(result)
    })
  })
