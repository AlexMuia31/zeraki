import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

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

  //  router to determine the current path
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Box>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#fff" }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleDrawer}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              {open ? (
                <CloseIcon sx={{ color: "#43AB49" }} />
              ) : (
                <Menu sx={{ color: "#2FA6DE" }} />
              )}
            </IconButton>
            <Box>
              <Link href="/">
                <Image src="/logo.png" width={150} height={40} alt="logo" />
              </Link>
            </Box>
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
          <Link href="/" passHref>
            <ListItemButton
              sx={{
                "&:hover": { background: "#2FA6DE" },
                borderRadius: "10px",
                background: currentPath === "/" ? "#2FA6DE" : "inherit",
                mb: "4%",
              }}
              onClick={handleDrawer}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#fff", whiteSpace: "nowrap" }}
                primary="Dashboard Overview"
              />
            </ListItemButton>
          </Link>
          <Link href="/school_management" passHref>
            <ListItemButton
              sx={{
                "&:hover": { background: "#2FA6DE" },
                borderRadius: "10px",
                background:
                  currentPath === "/school_management" ? "#2FA6DE" : "inherit",
              }}
              onClick={handleDrawer}
            >
              <ListItemIcon>
                <SchoolIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#fff", whiteSpace: "nowrap" }}
                primary="School Management"
              />
            </ListItemButton>
          </Link>
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
