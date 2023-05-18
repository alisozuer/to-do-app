import gql from 'graphql-tag';

const MARK_TODO_AS_DONE = gql`
  mutation markTodoAsDone(
    $id: Int!
  ) {
    update_todos_by_pk(
      pk_columns: {
        id: $id
      },
      _set: {
        isDone: true
      }
    ) {
      id
    }
  }
`;


export default MARK_TODO_AS_DONE;