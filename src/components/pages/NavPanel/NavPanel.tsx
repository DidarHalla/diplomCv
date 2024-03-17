import { routes } from "../../../constants/routes";
import { LinkPanel } from "../../atoms/link/linkPanel";
import { Location, Outlet, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { NavPanelContext } from "./NavPanel.Context";
import { Home, NavigateNext } from "@mui/icons-material";
import { NavPanelConfig } from "./NavPanel. types";
import * as Styled from "./NavPanel.styles";
import { Box, Toolbar } from "@mui/material";
import { DateUser } from "../../atoms/navPanel-dateUser/navPanel-dateUser.atom";

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
                  {userId ? (
                    <DateUser userId={userId} text={option?.text} />
                  ) : (
                    option?.text
                  )}
                </LinkPanel>
              );
            })}
          </Styled.BreadCrumbs>
        </Toolbar>
        <Outlet />
      </Box>
    </>
  );
};
