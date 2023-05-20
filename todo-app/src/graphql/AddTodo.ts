import { gql } from 'graphql-tag';

const ADD_TODO = gql`
  mutation addTodo(
    $description: String!
    $id: Int!
    $isDone: Boolean!
    $priority: Int!
  ) {
    insert_todos_one(
      object: {
        id: $id, 
        description: $description,
        isDone: $isDone,
        priority: $priority
      }
    ) {
      description
      isDone
      priority
    }
  }
`;

export default ADD_TODO;
