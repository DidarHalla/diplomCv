import { createContext, useState } from "react";
import {
  NavPanelConfig,
  NavPanelContextValue,
  NavPanelProviderProps,
} from "./NavPanel. types";

const defaultValue: NavPanelContextValue = {
  config: {},
  updateConfig: () => {},
};

export const NavPanelContext = createContext(defaultValue);

export const NavPanelProvider = ({ children }: NavPanelProviderProps) => {
  const [config, setConfig] = useState<NavPanelConfig>(defaultValue.config);

  const updateConfig = (config: NavPanelConfig) => {
    setConfig(config);
  };

  return (
    <NavPanelContext.Provider value={{ config, updateConfig }}>
      {children}
    </NavPanelContext.Provider>
  );
};
