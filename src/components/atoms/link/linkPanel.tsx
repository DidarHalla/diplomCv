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
        // указать цвет иконки и текста, и удалить проп
      }}
      to={props.to}
      color={props.color}
    >
      {props.icon && (
        <Icon
          component={props.icon}
          sx={{
            position: "absolute",
            mr: 4,
            zIndex: "5000",
            color: `${props.color}`,
          }}
        />
      )}
      <Typography
        sx={{
          ml: props.icon ? 12 : 0,
        }}
      >
        {props.children}
      </Typography>
    </Link>
  );
};
