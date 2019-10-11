import gql from "graphql-tag";

const ALL_TODOS_QUERY = gql`
  {
    allTodos {
      uuid
      title
      completed
    }
  }
`;

export default ALL_TODOS_QUERY;
