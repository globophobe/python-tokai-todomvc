import { request } from "graphql-request";
import { GRAPHQL_URL } from "../../app/constants";

const REFRESH_TOKEN_MUTATION = `
  mutation($token: String!) {
    refreshToken(token: $token) {
      access
    }
  }
`;

export default async function refreshTokenMutation(token) {
  const data = await request(GRAPHQL_URL, REFRESH_TOKEN_MUTATION, { token });
  const {
    refreshToken: { access }
  } = data;
  return access;
}
