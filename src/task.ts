import env from './env'
import watch from './watch'

export let taskInterval = null

export default () => {
  taskInterval = setInterval(watch, env.WATCH_INTERVAL_SECONDS * 1000)
}
