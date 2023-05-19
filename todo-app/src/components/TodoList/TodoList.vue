<template src="./TodoList.html"></template>
<style lang="scss" src="./TodoList.scss" scoped></style>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import GET_TODOS from '../../graphql/GetTodo';
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
    apollo: {
      todos: {
        query: GET_TODOS,
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      }
    }
    })
  export default class Todolist extends Vue {
    todos: Todo[] = [];
  }
  </script>
