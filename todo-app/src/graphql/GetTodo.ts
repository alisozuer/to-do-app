import { gql } from 'graphql-tag';

const GET_TODOS = gql`
  query todos($isDone: Boolean, $order: order_by) {
    todos(
      where: {
        isDone: { _eq: $isDone }
      }
      order_by: { priority: $order, created_at: desc }
    ) {
      id
      description
      isDone
      priority
    }
  }
`;

export default GET_TODOS;