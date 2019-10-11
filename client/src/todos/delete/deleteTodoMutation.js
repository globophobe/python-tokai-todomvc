import gql from "graphql-tag";

const DELETE_TODO_MUTATION = gql`
  mutation($uuid: String!) {
    deleteTodo(uuid: $uuid) {
      uuid
    }
  }
`;

export default DELETE_TODO_MUTATION;
