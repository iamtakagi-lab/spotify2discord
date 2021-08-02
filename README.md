# spotify-playing-feed

Spotify NowPlaying notifier on discord

![スクリーンショット 2021-08-02 12 46 15](https://user-images.githubusercontent.com/46530214/127801803-4509eb23-9132-4b2d-a0f7-1cd00c31adcf.png)


## Installation

```
nano docker-compose.example.yml
docker-compose up -d --build
```

## Authentication

http://YOUR_HOST:YOUR_PORT/auth/login

| URL                               | Summary                  |
| --------------------------------- | ------------------------ |
| http://localhost:3000/auth/login  | ログインします           |
| http://localhost:3000/auth/me     | ログイン状態を返答します |
| http://localhost:3000/auth/logout | ログアウトします         |

[data/credential.json](data/credential.json) にトークンデータが保存されます

## LICENSE

iamtakagi/spotify-playing-feed is provided under the MIT license.
