export default function({ $axios, redirect }) {
    // リクエストを送信する直前に実行
    $axios.onRequest((config) => {
        console.log('Making request to ' + config.url)
        // ログイン時にjwtの失効期限を追加

        // もし失効しそうならトークンのリフレッシュ

        // 再度tokenの失効期限を追加
    })

    // リクエストエラーじに実行
    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
    // $axios.setToken('access_token')

    // // 注: ここの引数を今は使わないからと _ とかにするとエラーになる
    // $axios.onResponse((config) => {
    //     $axios.setHeader(
    //         'Access-Control-Allow-Origin' /** 許可するドメイン http://exsample.com あるいは通すだけなら '*' **/
    //     )
    // })
}
