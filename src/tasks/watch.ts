import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'
import { MessageEmbed, WebhookClient } from 'discord.js'
import { store } from '..'

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
      if (currentTrack && currentTrack.is_playing) {
        //再生開始したとき
        if (
          store.track == null ||
          store.track.item?.id != currentTrack.item?.id
        ) {
          const currentItem = currentTrack.item
          if (currentItem) {
            env.DISCORD_WEBOOK_URLS.split(',').map(async (url) => {
              const splitUrl = url.split('/')
              const webhook = new WebhookClient(splitUrl[5], splitUrl[6])
              const display_name = me.display_name
              const track_id = currentItem.uri.split(':')[2]
              const track_name = currentItem.name
              const track_url = `https://open.spotify.com/track/${track_id}`
              const tweet_url = `https://twitter.com/intent/tweet?url=${track_url}&hashtags=NowPlaying`
              const image_url = `https://spotify2image.vercel.app/image/track/${track_id}#.png`
              const scrapbox_link = `[${image_url} ${track_url}]`

              const embed = new MessageEmbed()
              embed.setColor("#7CFC00")
              embed.setTitle(`${display_name} is now playing`)
              embed.setURL(track_url)
              embed.addField("Playing Track", track_name, false)

              if(env.SHARE_ON_TWITTER) {
                embed.addField("Share on Twitter", `[Tweet with #NowPlaying](${tweet_url})`, false)
              }
              if(env.SCRAPBOX_LINK) {
                embed.addField("Scrapbox Link", scrapbox_link, false)
              }
              if(env.EMBED_IMAGE){
                embed.setThumbnail(image_url)
              }

              webhook.send(embed)
            })
            store.setTrack(currentTrack)
          }
        }
      }
    })
}
