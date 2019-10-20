import { ApolloClient } from "apollo-client";
import { ApolloLink, fromPromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import authHeaders from "../auth/headers";
import { GRAPHQL_URL } from "./constants";

// Cache
const cache = new InMemoryCache({ addTypename: true });

// Finally, http link
const retryLink = new RetryLink();
const httpLink = createHttpLink({ uri: GRAPHQL_URL });

// Auth
const authLink = setContext(async () => {
  const headers = await authHeaders();
  return { headers };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const authRequired = graphQLErrors.findIndex(
      ({ message }) => message === "Authentication Required"
    );
    if (authRequired > -1) {
      return fromPromise(
        authHeaders().then(auth => {
          operation.setContext({ headers: auth });
          return forward(operation);
        })
      );
    }
  }
});

const link = ApolloLink.from([retryLink, authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache
});

export default client;
