import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo client/client.ts";

import "./App.css";
import { Router } from "./components/router/router.tsx";
import { AlertError } from "./components/features/errors/errors.tsx";

export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router />
        <AlertError />
      </ApolloProvider>
    </>
  );
}
