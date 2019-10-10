<template>
  <v-app>
    <v-app-bar app clipped-right color="primary" fixed dark>
      <v-app-bar-nav-icon @click="$router.push('/app/chat')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        @click.stop="drawerRight = !drawerRight"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- v-content, v-contentはコンポーネントへの影響力が高いので削除 -->
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: process.env.title,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  methods: {
    debug() {}
  }
}
</script>
