import { DefinePlugin } from 'webpack'
import { config } from 'dotenv'

export default () => {
  // call dotenv and it will return an Object with a parsed key
  const env = config().parsed

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    plugins: [new DefinePlugin(envKeys)],
  }
}
