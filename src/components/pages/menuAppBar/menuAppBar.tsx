import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { authReactive } from '../../../graphql/authReactive/authReactive';


const drawerWidth = 240;
const navItems = [
  { name: "Главная", to: routes.users.root },
  { name: "Сотрудники", to: routes.users.root },
  { name: "Проекты", to: routes.projects.root },
  { name: "Резюме", to: routes.cvs.root },
  { name: "Отделы", to: routes.departments },
  { name: "Должности", to: routes.positions },
  { name: "Навыки", to: routes.skills },
  { name: "Языки", to: routes.languages }
];

export function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigation = useNavigate()


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

      <List>

        <NavLink to={navItems[0].to} style={{ textDecoration: "none" }} >

          <ListItem key={0} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: "#0000EE" }} >
              <ListItemText primary={navItems[0].name} />
            </ListItemButton>

          </ListItem>
        </NavLink>
        {navItems.slice(1).map((item, i) => (
          <NavLink to={item.to} style={{ textDecoration: "none" }} >
            {({ isActive }) => {
              return (<ListItem key={i} disablePadding>

                <ListItemButton sx={{ textAlign: 'center', backgroundColor: isActive ? "#1976d2" : "", color: isActive ? 'white' : "", ":hover": { color: "#0000EE" } }} >
                  <ListItemText primary={item.name} />
                </ListItemButton>

              </ListItem>)
            }}

          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      <AppBar  >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DiplomCv
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem value={"profile"} onClick={() => {
                navigation(routes.users.root + "/" + authReactive.getAuth().user$()?.id)
                handleClose()
              }}>Профиль</MenuItem>

              <MenuItem value={"settings"} onClick={(ev) => {
                navigation(routes.settings)
                handleClose()
              }}>Настройки</MenuItem>

              <Divider />

              <MenuItem value={"logout"} onClick={() => {
                authReactive.deleteAuth()
                navigation(routes.auth.login)
                handleClose()
              }}>Выйти</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{

            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />

      <Outlet />
    </Box>
  );
}
