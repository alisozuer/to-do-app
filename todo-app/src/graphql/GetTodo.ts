import { gql } from 'graphql-tag';

const GET_TODOS = gql`
  query todos {
    todos(order_by: { isDone: asc }) {
      id
      description
      isDone
    }
  }
`;

export default GET_TODOS;
