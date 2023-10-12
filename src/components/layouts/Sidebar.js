import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar} from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReviewsIcon from '@mui/icons-material/Reviews';
import DoneIcon from '@mui/icons-material/Done';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ScheduleIcon from '@mui/icons-material/Schedule';
import Menuitem from "../topbars/Menuitem";
const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState("Dashboard");
  const {
    collapseSidebar,
    collapsed,

  } = useProSidebar();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        height: "100vh",
        "& .ps-menu-icon": {
          padding: "10px 10px 5px 10px !important",
        },
        "& .ps-menu-label": {
          padding: "10px 2px 5px 15px !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
        },
        "& .ps-menu-label.ps-active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
 
      <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
        <Menu>
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={<MenuOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.primary[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[300]}>
                 Dillon CRM
                </Typography>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="10px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`./assets/dillon.jpeg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
          
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Sale Person
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
          

            <Menuitem
              title="Manage Leads"
              to="/"
              icon={<ContactsOutlinedIcon />}
       
              selected={selected}
              setSelected={setSelected}
            />
            <Menuitem
              title="Customers"
              to="/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Menuitem
              title="Schedules"
              to="/schedules"
              icon={<ScheduleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
      <Menuitem
              title="Reviews"
              to="/reviews"
              icon={<ReviewsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                  <Menuitem
              title="Productivity"
              to="/productivity"
              icon={<DoneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
      
     
      
          </Box>
        </Menu>
      </Sidebar>
    
    </Box>
  );
};

export default SideBar;