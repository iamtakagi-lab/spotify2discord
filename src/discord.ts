import env from './env'
import { MessageEmbed, WebhookClient } from 'discord.js'
import SpotifyWebApi from 'spotify-web-api-node'

const makeData = async (track, me, spotify: SpotifyWebApi) => {
  const item = track.item
  const details = (await spotify.getTrack(item.id)).body
  const album = details.album
  const track_id = item.uri.split(':')[2]
  const image_url = `https://spotify2image.vercel.app/image/track/${track_id}#.png`
  const track_url = `https://open.spotify.com/track/${track_id}`
  const tweet_url = `https://twitter.com/intent/tweet?url=${track_url}&hashtags=NowPlaying`
  return {
    artists: details.artists,
    album_type: album.album_type,
    album_name: album.name,
    display_name: me.display_name,
    track_name: item.name,
    track_url: track_url,
    tweet_url: tweet_url,
    image_url: image_url,
    scrapbox_link: `[${image_url} ${track_url}]`,
    timestamp: track.timestamp,
  }
}

const makeEmbed = ({
  artists,
  album_type,
  album_name,
  display_name,
  track_name,
  track_url,
  tweet_url,
  image_url,
  scrapbox_link,
  timestamp,
}) => {
  const embed = new MessageEmbed()
  embed.setColor('#7CFC00')
  embed.setTitle(`${display_name} is now playing`)
  embed.setURL(track_url)
  embed.addField('Playing Track', track_name, true)
  embed.addField(
    'Artist' + (artists.length > 1 ? 's' : ''),
    artists.map((artist) => artist.name).join(', '),
    true
  )
  embed.addField(
    album_type,
    album_name,
    true
  )
  embed.setTimestamp(timestamp)
  if (env.SHARE_ON_TWITTER) {
    embed.addField(
      'Share on Twitter',
      `[Tweet with #NowPlaying](${tweet_url})`,
      false
    )
  }
  if (env.SCRAPBOX_LINK) {
    embed.addField('Scrapbox Link', scrapbox_link, false)
  }
  if (env.EMBED_IMAGE) {
    embed.setImage(image_url)
  }
  return Promise.resolve(embed)
}

export default async (splitUrl, spotify, track, me) => {
  makeData(track, me, spotify).then((data) => {
    makeEmbed(data).then(async (embed) => {
      await new WebhookClient(splitUrl[5], splitUrl[6]).send(embed)
    })
  })
}
