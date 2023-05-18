import gql from 'graphql-tag';

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

export default DELETE_TODO;
