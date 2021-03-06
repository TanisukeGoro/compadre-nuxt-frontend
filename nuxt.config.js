import colors from 'vuetify/es5/util/colors'
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)
const splashscreens = require(`./config/splashscreens`) // import splash screen meta tag
// ここで切り替え
const apiUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:80/api/v1/'
        : 'https://compadre.herokuapp.com/api/v1/'
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
                content:
                    'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
            },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black-translucent'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            {
                name: 'google',
                content: 'notranslate'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ...splashscreens.splashscreens
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {},
    /*
     ** Global CSS
     */
    css: ['@/assets/css/iti-flags.css', '@/assets/css/logo-font.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/fillters', '~/plugins/head.js', '~/plugins/axios'],
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
        '@nuxtjs/auth',
        'nuxt-webfontloader'
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
    proxy: {},
    pwa: {
        manifest: {
            start_url: '/app/select',
            name: 'Mafee',
            description: 'The Mafee frontend side project',
            theme_color: '#F4D03F'
        }
    },
    /**
     * Auth module configuration
     * See https://auth.nuxtjs.org/
     */
    auth: {
        localStorage: false,
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
                        url: `${apiUrl}auth/login`,
                        method: 'post',
                        // レスポンスのトークンが入っているkey
                        propertyName: 'access_token'
                    },
                    logout: {
                        url: `${apiUrl}auth/logout`,
                        method: 'post'
                    },
                    user: {
                        url: `${apiUrl}user`,
                        method: 'get',
                        propertyName: 'user'
                    }
                }
            },
            facebook: {
                client_id: '2492514334313989',
                userinfo_endpoint:
                    'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
                scope: ['public_profile', 'email', 'user_birthday']
            }
        }
    },
    webfontloader: {
        google: {
            families: ['Pacifico:400,700'] // Loads Lato font with weights 400 and 700
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
                    secondary: '#fff7d9',
                    accent: '#4F75A0',
                    error: '#ED5E7D',
                    warning: '#FF934F',
                    info: '#cddc39',
                    success: '#EBB920',
                    background: '#fafafa',
                    chips: '#FAEEB8',
                    chipsColor: '#61636b',
                    logoText: '#fff7d9',
                    text: '#c76b33'
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
