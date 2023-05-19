import { gql } from 'graphql-tag';

const GET_TODOS = gql`
  query todos {
    todos {
      id
      description
      isDone
    }
  }
`;

export default GET_TODOS;
