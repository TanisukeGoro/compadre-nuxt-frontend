<template>
  <div id="app">
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          hover
        >
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-tooltip :disabled="tooltipsDisabled" left :value="tooltips">
          <v-btn slot="activator" fab dark small color="green">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Edit Item</span>
        </v-tooltip>
        <v-tooltip :disabled="tooltipsDisabled" left :value="tooltips">
          <v-btn slot="activator" fab dark small color="indigo">
            <v-icon>mdi-add</v-icon>
          </v-btn>
          <span>Add Item</span>
        </v-tooltip>
        <v-tooltip :disabled="tooltipsDisabled" left :value="tooltips">
          <v-btn slot="activator" fab dark small color="red">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete Item</span>
        </v-tooltip>
      </v-speed-dial>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    tooltips: false,
    tooltipsDisabled: false
  }),

  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' }
        case 'two':
          return { class: 'red', icon: 'edit' }
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' }
        default:
          return {}
      }
    }
  },

  watch: {
    fab(val) {
      this.tooltips = false
      this.tooltipsDisabled = false
      val &&
        setTimeout(() => {
          this.tooltips = true
          this.$nextTick(() => (this.tooltipsDisabled = true))
        }, 250)
    },
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    }
  }
}
</script>
