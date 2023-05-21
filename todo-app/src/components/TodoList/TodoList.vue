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
    selectedOrder = 'asc';
    optionsOrder = [
          { value: 'asc', text: 'Ascending' },
          { value: 'desc', text: 'Descending' },
        ];
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
  private setupTodosQuery() {
    const isDone = this.tabs[this.activeTab].title === 'Done';
    this.$apollo.addSmartQuery('todos', {
      query: GET_TODOS,
      fetchPolicy: 'network-only',
      variables: {
        isDone,
        order: this.selectedOrder,
      },
    });
  }

  private updateTodosQuery() {
    const isDone = this.tabs[this.activeTab].title === 'Done';
    this.$apollo.queries.todos.setVariables({
      isDone,
      order: this.selectedOrder === 'asc' ? 'asc' : 'desc',
    });
    this.$apollo.queries.todos.refetch();
  }
  created() {
    try {
      this.setupTodosQuery();
    } catch (error) {
      console.log(error);
    }
  }

  @Watch('selectedOrder')
  onSelectedOrderChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue && this.$apollo.queries.todos) {
      this.updateTodosQuery();
    }
  }

  @Watch('activeTab', { immediate: true })
  onActiveTabChange(newValue: number, oldValue: number) {
    if (newValue !== oldValue && this.$apollo.queries.todos) {
      this.updateTodosQuery();
    }
  }
}
  </script>
