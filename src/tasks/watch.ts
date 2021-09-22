import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'
import { store } from '..'
import sendDiscord from '../discord'

export default async () => {
    if (
        store.credential.accessToken == null ||
        store.credential.refreshToken == null ||
        store.credential.accessToken.length <= 0 ||
        store.credential.refreshToken.length <= 0
    )
        return

    const spotify = new SpotifyWebApi({
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        redirectUri: env.SPOTIFY_REDIRECT_URI,
        accessToken: store.credential.accessToken,
        refreshToken: store.credential.refreshToken,
    })

    spotify
        .getMe()
        .then((data) => {
            return data.body
        })
        .catch(async (e) => {
            const ref = (await spotify.refreshAccessToken()).body
            const accessToken = ref.access_token
            const refreshToken = ref.refresh_token
            if (accessToken) {
                store.setAccessToken(accessToken)
                spotify.setAccessToken(accessToken)
            }
            if (refreshToken) {
                store.setRefreshToken(refreshToken)
                spotify.setRefreshToken(refreshToken)
            }
            const data = await spotify.getMe()
            return data.body
        })
        .then(async (me) => {
            const currentTrack = (await spotify.getMyCurrentPlayingTrack()).body

            //再生していないとき
            if (store.track != null && currentTrack && !currentTrack.is_playing) {
                store.resetTrack()
                return
            }

            if (currentTrack && currentTrack.is_playing) {
                //再生開始したとき
                if (
                    store.track == null ||
                    store.track.item?.id != currentTrack.item?.id
                ) {
                    const currentItem = currentTrack.item
                    if (currentItem) {
                        env.DISCORD_WEBOOK_URLS.split(',').map(async (url) => {
                            await sendDiscord(url.split('/'), spotify, currentTrack, me)
                        })
                        store.setTrack(currentTrack)
                    }
                }
            }
        })
}
