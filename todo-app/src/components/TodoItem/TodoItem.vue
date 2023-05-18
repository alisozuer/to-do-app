<template src="./TodoItem.html"></template>
<style lang="scss" src="./TodoItem.scss" scoped></style>
  
  <script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import DELETE_TODO from '../../graphql/DeleteTodo';
  import UPDATE_TODO from '../../graphql/UpdateTodo';
  import MARK_TODO_AS_DONE from '../../graphql/MarkAsDone';
  import MARK_TODO_AS_UNDONE from '../../graphql/MarkAsUnDone';
  
  @Component
  export default class Todolist extends Vue {
  
  @Prop() id!: number;
  @Prop() description!: string;
  @Prop() isDone!: boolean;
  editedIsDone = false;
  editMode = false;
  editDescription = '';



  editTodo(): void {
    this.editMode = true;
  }

  async deleteTodo(): Promise<void> {
    try {
      await this.$apollo.mutate({
        mutation: DELETE_TODO,
        variables: {
          id: this.id
        },
        refetchQueries: ['todos']
      });
    } catch (error) {
      console.error(error);
    }
  }
  async toggleTodoStatus(): Promise<void> {
    try {
      const mutation = this.editedIsDone ? MARK_TODO_AS_DONE : MARK_TODO_AS_UNDONE;
      await this.$apollo.mutate({
        mutation,
        variables: {
          id: this.id
        },
        refetchQueries: ["todos"],
      });
    } catch (error) {
      console.error(error);
    }
  }
  save(): void {
    this.$apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: this.id,
        description: this.editDescription
      },
      refetchQueries: ["todos"],
      errorPolicy: 'all',
    }).then(() => {
         this.editMode = false;
        }).catch((error) => {
         console.error(error);
         this.editMode = false;
        });
  }
  private handleClickOutside(event: MouseEvent): void {
    if (!(this.$el as HTMLElement).contains(event.target as Node)) {
      this.editMode = false;
    }
  }

  private mounted(): void {
    document.addEventListener('click', this.handleClickOutside);
    this.editedIsDone = this.isDone;
  }

  private beforeDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }
  }
  </script>