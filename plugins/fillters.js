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
    const results =
        minLangCodes.find((i) => i.iso639_1 === langCode.toUpperCase()) || null
    return results.local
})
// Country Code => Country Name
Vue.filter('countryCode2countryName', function(country) {
    const results =
        countriesName.find((i) => i.iso2 === country.toUpperCase()) || null
    return results ? results.name : ''
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
