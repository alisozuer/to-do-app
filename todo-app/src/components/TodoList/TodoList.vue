<template src="./TodoList.html"></template>
<style lang="scss" src="./TodoList.scss" scoped></style>
  
  <script lang="ts">
  import { Component, Vue, Prop  } from 'vue-property-decorator';
  import TodoItem from '../TodoItem/TodoItem.vue'
  
  interface Todo {
    id: number;
    description: string;
    isDone: boolean;
  }
  
  @Component({
  components: {
    TodoItem,
  },
})
  export default class Todolist extends Vue {
    @Prop({ required: true })
    todos!: Todo[];
  }
  </script>
  