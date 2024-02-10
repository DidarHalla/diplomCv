import { AppBar, Tab, Tabs } from "@mui/material";
import { routes } from "../../../constants/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Auth = () => {
  return (
    <>
      <AppBar>
        <Tabs value={useLocation().pathname}>
          <Tab
            value={routes.auth.login}
            label={"Login"}
            component={NavLink}
            to={routes.auth.login}
          ></Tab>
          <Tab
            value={routes.auth.signup}
            label={"Signup"}
            component={NavLink}
            to={routes.auth.signup}
          ></Tab>
        </Tabs>
      </AppBar>
      <Outlet  />
    </>
  );
};
