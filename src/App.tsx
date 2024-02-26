import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo client/client.ts";

import "./App.css";
import { Router } from "./components/router/router.tsx";
import { AlertError } from "./components/features/errors/errors.tsx";
import { Dialogs } from "./components/features/dialog/dialog.tsx";
import { NavPanelProvider } from "./components/organisms/NavPanel/NavPanel.Context.tsx";

export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavPanelProvider>
          <Router />
        </NavPanelProvider>
        <AlertError />
        <Dialogs />
      </ApolloProvider>
    </>
  );
}
