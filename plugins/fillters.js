import Vue from 'vue'

// 改行処理
Vue.filter('formatNewLine', function(value) {
    if (value) {
        return value.split('\n')
    }
})

// 本文のトリミング
Vue.filter('description', function(value) {
    if (value) {
        return value.slice(0, 100) + '...'
    }
})
