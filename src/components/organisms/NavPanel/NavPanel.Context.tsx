import { createContext, useCallback, useMemo, useState } from "react";
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

export const NavPanelProvider = (children: NavPanelProviderProps) => {
  const [config, setConfig] = useState<NavPanelConfig>(defaultValue.config);
  const updateConfig = useCallback((config: NavPanelConfig) => {
    setConfig(config);
  }, []);

  const value = useMemo(() => {
    return { config, updateConfig };
  }, [config, updateConfig]);

  return (
    <NavPanelContext.Provider value={value}>
      {children}
    </NavPanelContext.Provider>
  );
};
