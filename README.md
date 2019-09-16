# the_madison

> The Madison frontend side project 

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

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
- 