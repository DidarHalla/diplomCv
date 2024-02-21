import { ReactNode } from "react";
import { SvgIconComponent } from "@mui/icons-material";

export type LinkPanelProps = {
  to: string;
  children: ReactNode;
  color?: string;
  icon?: SvgIconComponent;
};
