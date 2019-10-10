<template>
  <v-slider
    v-model="distance"
    label="距離"
    min="0"
    max="100"
    thumb-label
    @input="onChange"
  ></v-slider>
</template>

<script>
export default {
  data() {
    return {
      distance: ''
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.distance)
    }
  }
}
</script>
