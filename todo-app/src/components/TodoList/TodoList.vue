<template src="./TodoList.html"></template>
<style lang="scss" src="./TodoList.scss" scoped></style>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import GET_TODOS from '@/graphql/GetTodo';
  
  interface Todo {
    id: number;
    description: string;
    isDone: boolean;
  }
  
  @Component
  export default class Todolist extends Vue {
    todos: Todo[] = [];
  
    async mounted() {
    try {
      const response = await this.$apollo.query({
        query: GET_TODOS,
      });
      this.todos = response.data.todos;
    } catch (error) {
      console.error(error);
    }
  }
  }
  </script>
  
  <style scoped>
  </style>
  