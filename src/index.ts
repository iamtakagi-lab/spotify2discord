import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import requestId from 'koa-requestid'

import SpotifyAuthClient from './auth/auth-client'
import env from './env'
import router from './routes'
import Store from './store'
import task from './task'
import authInitializer from './auth-initializer'

export const auth = new SpotifyAuthClient()
export const store = new Store()

const koa = new Koa()
  .use(bodyParser())
  .use(requestId())
  .use(helmet())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

;(() => {
  koa.listen(env.PORT, () => {
    console.info(
      `API server listening on ${env.HOST}:${env.PORT}, in ${env.NODE_ENV}`
    )
    authInitializer(store)
    task()
  })
})()
