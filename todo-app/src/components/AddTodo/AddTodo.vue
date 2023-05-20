<template src="./AddTodo.html"></template>
<style lang="scss" src="./AddTodo.scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ADD_TODO from '../../graphql/AddTodo';

@Component
export default class AddTodo extends Vue {
  enteredDescription = '';
  priorityOptions = [
          { value: 3, text: 'Low' },
          { value: 2, text: 'Mid' },
          { value: 1, text: 'High' },
        ];
  priorityValue = 1;
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
          isDone,
          priority: this.priorityValue,
        },
        refetchQueries: ['todos']
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

