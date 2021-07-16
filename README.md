# spotify-playing-feed

Spotifyの再生情報をDiscordに送信します

## Installation

```
nano docker-compose.example.yml
docker-compose up -d --build
```

## Authentication
http://YOUR_HOST:YOUR_PORT/auth/login

URL | Summary
---- | ----
http://localhost:3000/auth/login | ログインします
http://localhost:3000/auth/me | ログイン状態を返答します
http://localhost:3000/auth/logout | ログアウトします

[data/credential.json](data/credential.json) にトークンデータが保存されます

## LICENSE
iamtakagi/spotify-playing-feed is provided under the MIT license.
