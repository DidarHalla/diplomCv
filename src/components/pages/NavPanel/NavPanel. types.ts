import { ReactNode } from "react";
import { SvgIconComponent } from "@mui/icons-material";

export type NavPanelConfig = {
  [key: string]: {
    text: string | undefined;
    to?: string;
    color?: string;
    Icon?: SvgIconComponent;
  };
};

export type NavPanelContextValue = {
  config: NavPanelConfig;
  updateConfig: (config: NavPanelConfig) => void;
};

export type NavPanelProviderProps = {
  children: ReactNode;
};
