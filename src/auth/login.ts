import { generateRandomString } from '../utils'
import { Context } from 'koa'
import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'

export default async (ctx: Context) => {
  const spotify = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI
  })
  const state = generateRandomString(16)
  const scope = ['user-read-private', 'user-read-currently-playing']
  spotify.createAuthorizeURL(scope, state)
  ctx.cookies.set('state', state)
  ctx.redirect(spotify.createAuthorizeURL(scope, generateRandomString(16)))
}
