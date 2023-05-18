<template src="./AddTodo.html"></template>
<style lang="scss" src="./AddTodo.scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ADD_TODO from '../../graphql/AddTodo';
import GET_TODOS from '../../graphql/GetTodo';

@Component
export default class AddTodo extends Vue {
  enteredDescription = '';
  
  addTask(): void {
    if (this.enteredDescription !== '') {
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
        refetchQueries: [{ query: GET_TODOS}]
        }).then(() => {
         this.enteredDescription = '';
         this.$emit('getItem');
        }).catch((error) => {
         console.error(error);
         this.enteredDescription = '';
        });
    }
  
  }
}
</script>

