import colors from 'vuetify/es5/util/colors'
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)
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
                content: 'width=device-width, initial-scale=1'
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
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphone5_splash.png',
                media:
                    '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphone6_splash.png',
                media:
                    '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphoneplus_splash.png',
                media:
                    '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphonex_splash.png',
                media:
                    '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphonexr_splash.png',
                media:
                    '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/iphonexsmax_splash.png',
                media:
                    '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/ipad_splash.png',
                media:
                    '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/ipadpro1_splash.png',
                media:
                    '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/ipadpro3_splash.png',
                media:
                    '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
            },
            {
                rel: 'apple-touch-startup-image',
                href: '/splashscreens/ipadpro2_splash.png',
                media:
                    '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@/assets/css/iti-flags.css', '@/assets/css/logo-font.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/fillters', '~/plugins/head.js'],
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
            start_url: '/app/select'
        }
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
                    secondary: '#F5D76E',
                    accent: '#4F75A0',
                    error: '#ED5E7D',
                    warning: '#ffeb3b',
                    info: '#cddc39',
                    success: '#EBB920',
                    background: '#fafafa',
                    chips: '#FAEEB8',
                    chipsColor: '#61636b',
                    logoText: '#4db4da'
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
