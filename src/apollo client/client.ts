import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://cv-project-js.inno.ws/api/graphql",
});

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Authorization: `Bearer ${access_token}`
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
