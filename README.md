# the_madison

> The Madison frontend side project 

## Routing

- /register
- /login
- /app
  - /chat
  - /chat/{room_id}
  - /attention-me 自分のことをいいねしてくれた人一覧
  - /attention-card いいねしてくれた人の羅列
  - /greetings/{user_id}
  - /edit-profile
  - /settings
  - /faq よくある質問
  - /logout

## Config

- develop以外ではconsole.logを許容しないようにする
  
## env

環境変数はgitignoreしているので確実用意すること

## Vuetifyｖ

`nuxt.config.js`にカラーテーマをセットする

|   **size**   | **key** |      **use case**      |     **px**      |
| :----------: | :-----: | :--------------------: | :-------------: |
| Extra small  |   xs    | small to large handset |     < 600px     |
| tabletSmall  |   sm    | small to medium tablet | 600px > < 960px |
| laptopMedium |   md    | large tablet to laptop | 960px > < 1264* |

## Build Setup

* env files heve not contain in this repository

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# 本番環境やステージングのテスト
$ npm run dev:prod
$ npm run dev:stage

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
