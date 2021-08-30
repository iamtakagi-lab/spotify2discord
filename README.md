# spotify2discord

Spotify playing info to discord

![スクリーンショット 2021-08-31 4 59 38](https://user-images.githubusercontent.com/46530214/131397917-d1d89bde-201c-479a-8ad6-8aa8a41098f1.png)

## Installation

```
git clone git@github.com:iamtakagi/spotify-playing-feed.git
nano docker-compose.example.yml
docker-compose up -d --build
```

## Initial Login

http://localhost:3000/auth/login

## Authentication

| URL                               | Summary                  |
| --------------------------------- | ------------------------ |
| http://localhost:3000/auth/login  | ログインします           |
| http://localhost:3000/auth/me     | ログイン状態を返答します |
| http://localhost:3000/auth/logout | ログアウトします         |

[data/credential.json](data/credential.json) にトークンデータが保存されます

## LICENSE

iamtakagi/spotify2discord is provided under the MIT license.
