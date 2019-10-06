import colors from 'vuetify/es5/util/colors'
// ここでenvの設定ファイルの切り替え
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)

export default {
    mode: 'spa',
    env: envSet,
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@/assets/css/iti-flags.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/fillters'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/pwa',
        '@nuxtjs/auth'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: true,
        requestInterceptor(config, { store }) {
            if (store.state.csrfToken) {
                config.headers.common['x-csrf-token'] = store.state.csrfToken
            }
            return config
        }
    },
    /**
     * proxy module configration
     * プロキシを設定したけど動く気がしないのでとりあえず放置する。
     */
    proxy: {
        '/api': 'http://localhost/api/v1/',
        '/geolocation':
            'https://geoapi.heartrails.com/api/json?method=searchByGeoLocation'
    },
    /**
     * Auth module configuration
     * See https://auth.nuxtjs.org/
     */
    auth: {
        redirect: {
            login: '/login', // 未ログイン時のリダイレクト先
            logout: '/', // ログアウト処理を実行した直後のリダイレクト先
            callback: '/callback', // コールバックURL（各プロバイダで設定したものと同じPathにする）
            home: '/app/select' // ログイン後に遷移するページ
        },
        strategies: {
            local: {
                // APIのエンドポイント
                endpoints: {
                    login: {
                        url: 'http://localhost/api/v1/auth/login',
                        method: 'post',
                        // レスポンスのトークンが入っているkey
                        propertyName: 'access_token'
                    },
                    logout: {
                        url: 'http://localhost/api/v1/auth/logout',
                        method: 'post'
                    },
                    user: {
                        url: 'http://localhost/api/v1/user',
                        method: 'get',
                        propertyName: 'user'
                    }
                }
            },
            github: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                scope: ['read:user'] // デフォルトだと ['user', 'email'] となり、権限がやや強いので絞る
            },
            facebook: {
                client_id: '433680970792692',
                userinfo_endpoint:
                    'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
                scope: ['public_profile', 'email', 'user_birthday'],
                redirect_uri: 'http://localhost:3000/callback'
            }
        }
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        // 色のテーマ
        theme: {
            dark: false,
            themes: {
                // 通常のテーマ
                light: {
                    primary: '#F4D03F',
                    secondary: '#F5D76E',
                    accent: '#4F75A0',
                    error: '#ED5E7D',
                    warning: '#ffeb3b',
                    info: '#cddc39',
                    success: '#EBB920',
                    background: '#fafafa'
                },
                // ダークモードのとき
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    background: ''
                }
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    workbox: {
        dev: false
    },
    generate: {
        fallback: true
    },
    // 全てのページにAuth権限を付与する
    // eslint-disable-next-line no-dupe-keys
    router: {
        middleware: ['auth']
    }
}
