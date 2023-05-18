import { gql } from 'graphql-tag';

const ADD_TODO = gql`
  mutation addTodo(
    $description: String!
    $id: Int!
    $isDone: Boolean!
  ) {
    insert_todos_one(
      object: {
        id: $id, 
        description: $description,
        isDone: $isDone
      }
    ) {
      description
      isDone
    }
  }
`;

export default ADD_TODO;
