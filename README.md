# spotify-playing-feed

Spotify NowPlaying notifier on discord

![スクリーンショット 2021-07-30 5 35 20](https://user-images.githubusercontent.com/46530214/127562329-e4b3e0b4-3b13-4599-8ec9-527adc4209e4.png)

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
