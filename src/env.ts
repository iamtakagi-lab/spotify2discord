export default {
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
  PORT: process.env.PORT ? process.env.PORT : '3000',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
    ? process.env.SPOTIFY_REDIRECT_URI
    : '',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID
    ? process.env.SPOTIFY_CLIENT_ID
    : '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
    ? process.env.SPOTIFY_CLIENT_SECRET
    : '',
  DISCORD_WEBOOK_URLS: process.env.DISCORD_WEBOOK_URLS
    ? process.env.DISCORD_WEBOOK_URLS
    : '',
  SHARE_ON_TWITTER: process.env.SHARE_ON_TWITTER
    ? Boolean(process.env.SHARE_ON_TWITTER)
    : true,
  SCRAPBOX_LINK: process.env.SCRAPBOX_LINK
    ? Boolean(process.env.SCRAPBOX_LINK)
    : true,
  EMBED_IMAGE: process.env.EMBED_IMAGE
    ? Boolean(process.env.EMBED_IMAGE)
    : true,
  WATCH_INTERVAL_SECONDS: process.env.WATCH_INTERVAL_SECONDS
    ? Number(process.env.WATCH_INTERVAL_SECONDS)
    : Number(25),
}
