<template src="./AddTodo.html"></template>
<style lang="scss" src="./AddTodo.scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ADD_TODO from '@/graphql/AddTodo';

@Component
export default class AddTodo extends Vue {
  enteredDescription = '';
  
  addTask(): void {
    const id = Math.floor(Math.random() * 1000000);
    const description = this.enteredDescription;
    const isDone = false;

    this.$apollo.mutate({
    mutation: ADD_TODO,
    variables: {
      id,
      description,
      isDone
    },
    refetchQueries: ["todos"]
  }).then(() => {
    this.enteredDescription = '';
  }).catch((error) => {
    console.error(error);
    this.enteredDescription = '';
  });
  }
}
</script>

<style scoped lang="scss">
</style>
