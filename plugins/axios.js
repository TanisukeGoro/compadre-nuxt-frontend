// Refresh State flag
let refreshState = true

/**
 * Refresh JWT token
 * @param {Object} $axios
 * @param {Object} $auth
 */
const refreshToken = ($axios, $auth) => {
    refreshState = false
    console.info('Refresh Token!')
    $axios.$post(`${process.env.apiBaseUrl}auth/refresh`).then((i) => {
        $auth.setToken('local', `Bearer ${i.access_token}`) // refresh token to local storage, cookie
        $axios.setHeader('Authorization', `Bearer ${i.access_token}`) // refresh token axios request Header
        refreshState = true
    })
}

/**
 * Decode JWT token
 * @param {String} token JWT token
 */
const decodeJwt = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))))
}

export default function({ $axios, redirect, app }) {
    $axios.onRequest((config) => {
        try {
            const jwtToken = app.$auth.$storage.getLocalStorage('_token.local')
            if (jwtToken !== 'false') {
                const claimsJson = decodeJwt(jwtToken)
                const expTime = claimsJson.exp // sec
                const bufferTime = (claimsJson.exp - claimsJson.nbf) / 2 // In half time of expire time
                // console.log('update Time :', new Date(claimsJson.iat * 1000))
                // console.log('expire Time :', new Date(claimsJson.exp * 1000))
                // console.log('Refresh Time :', new Date((expTime - bufferTime) * 1000))
                if (new Date().getTime() > (expTime - bufferTime) * 1000) {
                    refreshState && refreshToken($axios, app.$auth)
                }
            }
        } catch (error) {}
    })

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}

// $axios.setToken('access_token')

// // 注: ここの引数を今は使わないからと _ とかにするとエラーになる
// $axios.onResponse((config) => {
//     $axios.setHeader(
//         'Access-Control-Allow-Origin' /** 許可するドメイン http://exsample.com あるいは通すだけなら '*' **/
//     )
// })
