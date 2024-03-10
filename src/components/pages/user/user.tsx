import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";

interface MenuDescriptionProps{
  tabsNavigates:{value:string,label:string}[]
}

export const MenuDescription = (props:MenuDescriptionProps) => {
  const {tabsNavigates}= props
  const navigation = useNavigate()
  const location = useLocation().pathname.split("/");

  function handleClick(_: React.SyntheticEvent, newValue: string) {
    navigation(newValue);
  }

  return (
    <Box sx={{ width: '100%' }}>

      <Tabs value={location[3]??false} onChange={handleClick}  >
        {tabsNavigates.map(({value,label})=><Tab value={value} label={label} />)}
       

      </Tabs>

      <Outlet />
    </Box>
  );
};
