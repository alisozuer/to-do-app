<template src="./TodoList.html"></template>
<style lang="scss" src="./TodoList.scss" scoped></style>
  
  <script lang="ts">
  import { Component, Vue, Watch  } from 'vue-property-decorator';
  import GET_TODOS from '../../graphql/GetTodo';
  import TodoItem from '../TodoItem/TodoItem.vue';
  interface Tab {
  title: string;
  filter?: (todo: Todo) => boolean;
  todos: Todo[];
  emptyMessage: string;
}
  interface Todo {
  id: number;
  description: string;
  isDone: boolean;
  priority: string;
  }
    @Component({
    components: {
      TodoItem,
    },
    })
  export default class Todolist extends Vue {
    todos: Todo[] = [];
    activeTab = 0;
    tabs: Tab[] = [
    {
      title: 'Not Done',
      filter: (todo: Todo) => todo.isDone,
      todos: [],
      emptyMessage: 'No unfinished missions...',
    },
    {
      title: 'Done',
      filter: (todo: Todo) => !todo.isDone,
      todos: [],
      emptyMessage: 'No completed missions...',
    },
  ];
 created() {
    try {
      const isDone = this.tabs[this.activeTab].title === 'Done';
      this.$apollo.addSmartQuery('todos', {
        query: GET_TODOS,
        fetchPolicy: 'network-only',
        variables: {
          isDone,
        },
      });
      } catch (error) {
      console.log(error);
    }
  }

  @Watch('activeTab', { immediate: true })
  onActiveTabChange(newValue: number, oldValue: number) {
    const isDone = this.tabs[this.activeTab].title === 'Done';
    if (newValue !== oldValue) {
      this.$apollo.queries.todos.setVariables({
        isDone,
      });
      this.$apollo.queries.todos.refetch();
    }
  }
  }
  </script>
