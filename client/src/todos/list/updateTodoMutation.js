import gql from "graphql-tag";

const UPDATE_TODO_MUTATION = gql`
  mutation($uuid: String!, $completed: Boolean!) {
    updateTodo(uuid: $uuid, completed: $completed) {
      uuid
      title
      completed
    }
  }
`;

export default UPDATE_TODO_MUTATION;
