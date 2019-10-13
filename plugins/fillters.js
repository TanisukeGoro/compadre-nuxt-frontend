import Vue from 'vue'
import { minLangCodes } from '~/plugins/langCode'
import { countriesName } from '~/plugins/phoneCodeCountries'

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

// YYYYMMDD => Age
Vue.filter('yyyymmdd2Age', function(yyyymmdd) {
    yyyymmdd.match(/^([1-2]\d{3})-(\d{1,2})-(\d{1,2})$/)
    if (yyyymmdd.match(/^[1-2]\d{3}-\d{1,2}-\d{1,2}$/)) {
        return getAge(
            yyyymmdd.split('-')[0],
            yyyymmdd.split('-')[1],
            yyyymmdd.split('-')[2]
        )
    }
})

// Language Code => Language Name
Vue.filter('langCode2langName', function(langCode) {
    if (langCode === null) return ' -- '
    const results =
        minLangCodes.find((i) => i.iso639_1 === langCode.toUpperCase()) || null
    return results ? results.local : ''
})
// Country Code => Country Name
Vue.filter('countryCode2countryName', function(country) {
    if (country === null) return ' -- '
    const results =
        countriesName.find((i) => i.iso2 === country.toUpperCase()) || null
    return results ? results.name : ''
})

Vue.filter('jobCode2JobName', function(jobCode) {
    const jobCodes = {
        1: '事務・オフィス系',
        2: '販売・飲食・サービス系',
        3: 'IT・エンジニア系',
        4: 'Web・クリエイター系',
        5: '医療・介護・福祉系',
        6: '研究機関・教育系',
        7: '商社・金融・経営',
        8: '学生'
    }
    return Number.isInteger(jobCode) ? jobCodes[jobCode] : ' -- '
})

/**
 * 画像のURLを変換するための
 */
Vue.filter('avatarIconUrl', function(iconUrl) {
    if (iconUrl === null || iconUrl === '')
        return require('~/assets/images/onErrorUserImg.png')
    return !~iconUrl.indexOf('lorempixel', 'start')
        ? `${process.env.AwsStoreImageUrl}${iconUrl}`
        : iconUrl
})

/**
 * GET User Age
 *
 * @param {number} year Birth year
 * @param {number} month Birth month
 * @param {number} day Birth day
 * @returns {number} User Age
 */
const getAge = (year, month, day) => {
    const birthday = new Date(year, month - 1, day)
    const today = new Date()
    const thisYearBirthday = new Date(
        today.getFullYear(),
        birthday.getMonth(),
        birthday.getDate()
    )
    const age = today.getFullYear() - birthday.getFullYear()
    // 今年の誕生日を迎えていなければage-1を返す
    return today < thisYearBirthday ? age - 1 : age
}
