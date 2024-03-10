import { routes } from "../../../constants/routes";
import { LinkPanel } from "../../atoms/link/linkPanel";
<<<<<<< HEAD
import { Location, Outlet, useLocation, useParams } from "react-router-dom";
=======
import { Location, Outlet, useLocation } from "react-router-dom";
>>>>>>> 0552899803c830af35aeb66efe49989141e130ca
import { useContext, useEffect } from "react";
import { NavPanelContext } from "./NavPanel.Context";
import { Home, NavigateNext } from "@mui/icons-material";
import { NavPanelConfig } from "./NavPanel. types";
import * as Styled from "./NavPanel.styles";
import { useUser } from "../../../hooks/use-users";
import { Box, Toolbar } from "@mui/material";

const useNavPanel = (config: NavPanelConfig, path: Location) => {
  const context = useContext(NavPanelContext);
  useEffect(() => {
    context.updateConfig(config);
  }, [path]);
  return null;
};

export const NavPanel: React.FC = () => {
  const { config } = useContext(NavPanelContext);
  const obj: NavPanelConfig = {};
  const navPath = useLocation();
  const links = navPath.pathname
    .split("/")
    .filter((link) => link)
    .map((name, index, array) => {
      return {
        name,
        to: "/" + array.slice(0, index + 1).join("/"),
      };
    });

  links.forEach((v) => {
    obj[v.to] = { text: v.name, to: v.to };
  });

  useNavPanel(obj, navPath);

  const { userId } = useParams();
  const { user, loading } = useUser(userId);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Toolbar variant="dense">
          <Styled.BreadCrumbs separator={<NavigateNext />}>
            <LinkPanel to={routes.root} icon={Home} color="inherit">
              Home
            </LinkPanel>
            {links.map(({ name, to }) => {
              const option = config[to];

              return (
                <LinkPanel
                  to={option?.to || to}
                  color={option?.color}
                  icon={option?.Icon}
                  key={name}
                >
                  {!loading && option?.text === userId
                    ? user?.profile?.full_name || user?.email
                    : option?.text}
                  {/* {option?.text} */}
                </LinkPanel>
              );
            })}
          </Styled.BreadCrumbs>
        </Toolbar>
        <Outlet />{" "}
      </Box>
    </>
  );
};
