import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { addErrorMessage } from "./authHooks/auth.hooks";
import { authReactive } from "../graphql/authReactive/authReactive";

const httpLink = createHttpLink({
  uri: "https://cv-project-js.inno.ws/api/graphql",
});

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      Authorization: `Bearer ${authReactive.getAuth().token$() ?? ""}`,
    },
  };
});

const authError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      addErrorMessage(message, "error");
      if (message === "Unauthorized") {
        authReactive.deleteAuth();
      }
    });
  if (networkError) {
    addErrorMessage(networkError.message, "error");
  }
});

export const client = new ApolloClient({
  link: from([authLink, authError, httpLink]),
  cache: new InMemoryCache(),
});
