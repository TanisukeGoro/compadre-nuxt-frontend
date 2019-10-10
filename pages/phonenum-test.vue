<template>
  <div>
    <v-layout row wrap>
      <v-flex xs4> </v-flex>
      <v-flex xs8> </v-flex>
    </v-layout>
    <v-text-field
      v-model="value"
      solo
      flat
      type="tel"
      label="phone number"
      @input="updateValue()"
    ></v-text-field>
    <div>
      <p class="inline iti-flag aw"></p>
      こんにちは
    </div>

    <v-select
      v-model="country"
      label="country"
      :items="countries"
      width="50px"
      item-value="iso2"
      item-text="name"
      return-object
      class="caption"
      @input="check"
    >
      <template slot="selection" slot-scope="{ item }">
        <p class="inline iti-flag" :class="item.iso2.toLowerCase()"></p>
        {{ item.name }}
      </template>
      <template slot="item" slot-scope="{ item }">
        <p class="inline iti-flag" :class="item.iso2.toLowerCase()"></p>
        {{ item.name }}
      </template>
    </v-select>
    <!-- <currency-input v-model="price"></currency-input> -->
  </div>
</template>

<script>
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'
import { countries } from '~/plugins/phoneCodeCountries'
export default {
  auth: false,
  layout: 'empty',
  components: {},
  data() {
    return {
      price: '',
      value: '',
      template: '',
      number: '',
      national: '',
      international: '',
      phoneUrl: '',
      type: '',
      possible: '',
      valid: '',
      // asYouType: new AsYouType('JP'),
      parsephoneNumber: parsePhoneNumberFromString('', 'JP'),
      country: '',
      countries
    }
  },
  computed: {
    phone() {
      return new AsYouType('JP').input(this.value)
    }
  },
  methods: {
    updateValue() {
      this.value = new AsYouType('JP').input(this.value)
    },
    check() {}
  }
}
</script>

<style>
.inline {
  display: inline-block;
  margin-bottom: 0 !important;
}
</style>
