<template>
  <v-row>
    <v-container fluid style="display: contents;">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        style="text-align: center;"
        @click="selectCard(item.key)"
      >
        <v-btn
          outlined
          dark
          style="border-radius: 1em; width: 150px; height: 50px;"
          elevation="5"
          text
          color="accent"
        >
          <v-list-item-title>
            <v-list-item-title
              class="title"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item-title>
        </v-btn>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Lunch',
        key: 'lunch_dinner'
      },
      {
        title: 'Cafe',
        key: 'cafe'
      },
      {
        title: 'Dinner',
        key: 'lunch_dinner'
      },
      {
        title: 'Activities',
        key: 'activities'
      },
      {
        title: 'Bar',
        key: 'bar'
      },
      {
        title: 'Shopping',
        key: 'shopping'
      },
      {
        title: 'other',
        key: 'other'
      }
    ]
  }),
  methods: {
    selectCard(select) {
      this.$emit('selectCardFromChild', { select })
    }
  }
}
</script>
