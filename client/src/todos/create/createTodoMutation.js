import gql from "graphql-tag";

const CREATE_TODO_MUTATION = gql`
  mutation($title: String!) {
    createTodo(title: $title) {
      uuid
      title
      completed
    }
  }
`;

export default CREATE_TODO_MUTATION;
