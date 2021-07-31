# spotify-playing-feed

Spotify NowPlaying notifier on discord

![スクリーンショット 2021-07-31 23 09 21](https://user-images.githubusercontent.com/46530214/127742439-6a4f862b-3caf-4af6-b1e8-626cec8e13b8.png)

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
