import { AppBar, Box, Drawer, Toolbar } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

const drawerWidth = 260;

const Layout = ({ children }: { children: React.ReactNode }) => {
  //opening and closing the drawer
  const [open, setOpen] = React.useState(false);

  const [openList, setOpenList] = React.useState(true);

  //used to make the drawer responsive
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <Box>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#fff" }}
      >
        <Toolbar>
          <Box>
            <Image src="/logo.png" width={150} height={40} alt="logo" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#43AB49",
            pl: "10px",
            pr: "10px",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawer}
      >
        <Toolbar />
        <List component="nav">
          <>
            <ListItemButton
              sx={{
                "&:hover": { background: "#2FA6DE" },
                borderRadius: "10px",
              }}
              onClick={handleClick}
              disableGutters
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#fff", whiteSpace: "nowrap" }}
                primary="Dashboard Overview"
              />
              {openList ? (
                <ExpandLess sx={{ color: "#fff" }} />
              ) : (
                <ExpandMore sx={{ color: "#fff" }} />
              )}
            </ListItemButton>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <CollectionsIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }} primary="Collections" />{" "}
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SubscriptionsIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }} primary="Sign Ups" />{" "}
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SubscriptionsIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#fff" }}
                    primary="Total Revenue"
                  />{" "}
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SubscriptionsIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#fff" }}
                    primary="Bounced Cheques"
                  />{" "}
                </ListItemButton>
              </List>
            </Collapse>
          </>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: "#f6f7f9",
          flexGrow: 1,
          pt: { xs: "37px" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          position: "relative",
          minHeight: "100vh",
          pb: "4%",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
