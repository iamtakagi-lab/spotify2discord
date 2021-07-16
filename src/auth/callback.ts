import SpotifyWebApi from 'spotify-web-api-node'
import { auth, store } from '..'
import env from '../env'

export const callback = async (ctx) => {
  let { code } = ctx.query
  if (code) {
    code = code.toString()
    const clientId = env.SPOTIFY_CLIENT_ID
    const clientSecret = env.SPOTIFY_CLIENT_SECRET
    auth
      .token({ code, clientId, clientSecret })
      .then(async (data) => {
        const spotify = new SpotifyWebApi({
          clientId: env.SPOTIFY_CLIENT_ID,
          clientSecret: env.SPOTIFY_CLIENT_SECRET,
          redirectUri: env.SPOTIFY_REDIRECT_URI,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        })
        const me = (await spotify.getMe()).body
        return Promise.all([me, data])
      })
      .then(async ([me, data]) => {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        store.setCredential({ accessToken, refreshToken })
        const message = `Logged-In as ${me.display_name || me.id}`
        console.log(message)
        ctx.body = message
        ctx.status = 200
      })
      .catch((e: any) => {
        console.error('Error: ', e, e.stack)
      })
  }
}
