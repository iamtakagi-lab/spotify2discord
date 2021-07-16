import env from './env'
import watch from './watch'

export default () => {
  setInterval(watch, env.WATCH_INTERVAL_SECONDS * 1000)
}
