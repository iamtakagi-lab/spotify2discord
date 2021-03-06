import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import requestId from 'koa-requestid'

import env from './env'
import router from './routes'
import Store from './store'
import runTask from './tasks'
import { getMe } from './auth/me'

export const store = new Store()

const main = () => {
  const koa = new Koa()
    .use(bodyParser())
    .use(requestId())
    .use(helmet())
    .use(cors())
    .use(router.allowedMethods())
    .use(router.routes())

  koa.listen(env.PORT, () => {
    console.info(
      `API server listening on ${env.HOST}:${env.PORT}, in ${env.NODE_ENV}`
    )
    getMe().then((me) => {
      console.log(`Logged-In as ${me.display_name || me.id}`)
      runTask()
    })
  })
}

main()
