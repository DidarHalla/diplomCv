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
import {} from "cv-graphql";

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

const authError = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      const respMessage = extensions.response as { message: [string] };
      addErrorMessage(respMessage.message[0] ?? message, "error");

      if (message === "Unauthorized") {
        authReactive.deleteAuth();
      }
    });
});

export const client = new ApolloClient({
  link: from([authLink, authError, httpLink]),
  cache: new InMemoryCache(),
});
