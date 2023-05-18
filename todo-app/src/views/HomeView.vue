<template>
  <div class="home">
    <AddTodo />
    <b-container>
      <TodoList />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddTodo from '@/components/AddTodo/AddTodo.vue';
import TodoList from '@/components/TodoList/TodoList.vue';

@Component({
  components: {
    AddTodo,
    TodoList,
  },
})
export default class HomeView extends Vue {}
</script>
