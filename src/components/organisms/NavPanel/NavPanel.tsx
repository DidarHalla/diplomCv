import { Breadcrumbs } from "@mui/material";

import { routes } from "../../../constants/routes";
import { LinkPanel } from "../../atoms/link/linkPanel";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { NavPanelContext } from "./NavPanel.Context";
import { HomeOutlined } from "@mui/icons-material";

export const NavPanel: React.FC = () => {
  const links = useLocation()
    .pathname.split("/")
    .filter((link) => link)
    .map((name, index, array) => ({
      name,
      to: "/" + array.slice(0, index + 1).join("/"),
    }));

  const { config } = useContext(NavPanelContext);
  return (
    <>
      <Breadcrumbs separator=">">
        <LinkPanel to={routes.root} icon={HomeOutlined} color="inherit">
          Home
        </LinkPanel>
        {links.map(({ name, to }) => {
          const repl = config[to];
          return (
            <LinkPanel to={repl?.to || to} key={name}>
              {repl?.text}
            </LinkPanel>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
