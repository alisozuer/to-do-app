<template>
  <div class="home">
    <AddTodo/>
    <b-container>
      <TodoList :todos="todos" />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddTodo from '../components/AddTodo/AddTodo.vue';
import TodoList from '../components/TodoList/TodoList.vue';
import GET_TODOS from '../graphql/GetTodo';

interface Todo {
  id: number;
  description: string;
  isDone: boolean;
}

@Component({
  components: {
    AddTodo,
    TodoList,
  },
})
export default class HomeView extends Vue {
  todos: Todo[] = [];

  async fetchTodos() {
    try {
      const response = await this.$apollo.query({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      });
      this.todos = response.data.todos;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async mounted() {
    await this.fetchTodos();
  }
}
</script>
