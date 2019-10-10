<template>
  <v-bottom-navigation app fixed grow shift>
    <v-textarea
      label="One row"
      auto-grow
      outlined
      rows="1"
      row-height="15"
    ></v-textarea>
    <textarea
      id="input-1004"
      auto-grow
      row-height="15"
      placeholder
      rows="1"
    ></textarea>
    <v-btn color="green" @click="clickhandler">ボタン</v-btn>
    <div></div>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      message: 'daisd'
    }
  },
  methods: {
    clickhandler() {
      alert('oaaaaaa')
    }
  }
}
</script>

<style></style>
