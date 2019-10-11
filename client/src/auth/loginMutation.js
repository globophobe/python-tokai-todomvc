import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access
      refresh
    }
  }
`;

export default LOGIN_MUTATION;
