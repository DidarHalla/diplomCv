import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { AuthResult } from "cv-graphql";
import { addErrorMessage } from "./authHooks/auth.hooks";

const httpLink = createHttpLink({
  uri: "https://cv-project-js.inno.ws/api/graphql",
});

export const authResult = makeVar<AuthResult | null>(null);

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
});

const authError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      // настроить ошибку
      addErrorMessage(message, "error");
      if (message === "Unauthorized") {
        authResult(null);
        localStorage.removeItem("token");
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
