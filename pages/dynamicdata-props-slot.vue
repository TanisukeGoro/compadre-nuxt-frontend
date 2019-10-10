<template>
  <div>
    <DynamicProps
      :name="dynamicArray[i].name"
      :age="dynamicArray[i].age"
      :home="dynamicArray[i].home"
    />
    <button @click="increment">次</button>
  </div>
</template>

<script>
import DynamicProps from '~/components/test/DynamicProps'
export default {
  layout: 'empty',
  components: {
    DynamicProps
  },
  data() {
    return {
      i: 0,
      dynamicArray: [
        {
          name: `A
                    A
                    A
                    A`,
          age: 12,
          home: '宮城県'
        },
        {
          name: `B
                    B
                    B
                    B`,
          age: 16,
          home: '岩手県'
        },
        {
          name: 'AAA',
          age: 42,
          home: '青森県'
        },
        {
          name: 'AAA',
          age: 22,
          home: '秋田県'
        }
      ]
    }
  },
  methods: {
    increment() {
      this.i++
    }
  }
}
</script>
