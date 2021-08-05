import runTask, { taskInterval } from '../tasks'
import SpotifyWebApi from 'spotify-web-api-node'
import { store } from '..'
import env from '../env'
import { Context } from 'koa'

export default async (ctx: Context) => {
  let code = ctx.query.code
  const state = ctx.query.state
  const storedState = ctx.cookies ? ctx.cookies['state'] : null;
  if (code && state) {
    if (state === null || state !== storedState) {
      ctx.redirect('/')
      return
    }
    ctx.cookies.set('state', null)
    code = code.toString()
    const spotify = new SpotifyWebApi({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      redirectUri: env.SPOTIFY_REDIRECT_URI,
    })
    spotify
      .authorizationCodeGrant(code)
      .then(async (res) => {
        return res.body
      })
      .then(async (data) => {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        store.setCredential({ accessToken, refreshToken })
        if (taskInterval == null) {
          runTask()
        }
      })
      .catch((e: any) => {
        console.error('Error: ', e, e.stack)
      })
    ctx.redirect('/auth/me')
  }
}
