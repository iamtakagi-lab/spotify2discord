# spotify-playing-feed

Spotifyの再生情報をDiscordに送信します

## Installation

```
nano docker-compose.example.yml
docker-compose up -d --build
```

## Login
http://YOUR_HOST:PORT/auth/login

http://localhost:3000/auth/login をブラウザで開くとログインできます \
[data/credentials.json](data/credential.json) にトークンデータが保存されます \
http://localhost:3000/auth/logout を開くとログアウトします

## LICENSE
iamtakagi/niconico-history-feed is provided under the MIT license.
