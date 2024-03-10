import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";

export const User = () => {
  const navigation = useNavigate();
  const location = useLocation().pathname.split("/");

  function handleClick(_: React.SyntheticEvent, newValue: string) {
    navigation(newValue);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={location[3] ?? false} onChange={handleClick}>
        <Tab value={"profile"} label={"Профиль"} />
        <Tab value={"skills"} label={"Навыки"} />
        <Tab value={"languages"} label={"Языки"} />
        <Tab value={"cvs"} label={"Резюме"} />
      </Tabs>

      <Outlet />
    </Box>
  );
};
