import gql from 'graphql-tag';

const MARK_TODO_AS_UNDONE = gql`
  mutation markTodoAsUndone(
    $id: Int!
  ) {
    update_todos_by_pk(
      pk_columns: {
        id: $id
      },
      _set: {
        isDone: false
      }
    ) {
      id
    }
  }
`;

export default MARK_TODO_AS_UNDONE;