import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import authHeaders from "../auth/headers";
import { GRAPHQL_URL } from "./constants";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

// Cache
const cache = new InMemoryCache({ addTypename: true });

// Finally, http link
const retryLink = new RetryLink();
const httpLink = createHttpLink({ uri: GRAPHQL_URL });

// Auth
let headers;
const authLink = setContext(async () => {
  if (headers) return headers;
  const h = await authHeaders();
  headers = { headers: h };
  return headers;
});

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    headers = null;
  }
});

const link = ApolloLink.from([retryLink, authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  defaultOptions
});

export default client;
