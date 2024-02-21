import { Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LinkPanelProps } from "./linkPanel.types";

export const LinkPanel = (props: LinkPanelProps) => {
  return (
    <Link
      style={{
        position: "relative",
        textTransform: "capitalize",
        textDecoration: "none",
      }}
      to={props.to}
      color={props.color}
    >
      {props.icon && <Icon sx={{ position: "absolute", mr: 4 }} />}
      <Typography
        sx={{
          ml: props.icon ? 4 : 0,
          textDecoration: "none",
        }}
      >
        {props.children}
      </Typography>
    </Link>
  );
};
