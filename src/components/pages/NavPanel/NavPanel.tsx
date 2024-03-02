import { routes } from "../../../constants/routes";
import { LinkPanel } from "../../atoms/link/linkPanel";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { NavPanelContext } from "./NavPanel.Context";
import { Home, NavigateNext } from "@mui/icons-material";
import { NavPanelConfig } from "./NavPanel. types";
// import { StyledBreadCrumbs } from "./NavPanel.styles";
import * as Styled from "./NavPanel.styles";

const useNavPanel = (config: NavPanelConfig, path) => {
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

  return (
    <>
      <Styled.BreadCrumbs separator={<NavigateNext />}>
        <LinkPanel to={routes.root} icon={Home} color="inherit">
          Home
        </LinkPanel>
        {links.map(({ name, to }) => {
          const option = config[to];

          return (
            <LinkPanel to={option?.to || to} color={option?.color} key={name}>
              {option?.text}
            </LinkPanel>
          );
        })}
      </Styled.BreadCrumbs>

      <Outlet />
    </>
  );
};