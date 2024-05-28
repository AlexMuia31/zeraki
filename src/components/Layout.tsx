import { AppBar, Box, Drawer, Toolbar } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const drawerWidth = 240;

const Layout = ({ children }: { children: React.ReactNode }) => {
  //opening and closing the drawer
  const [open, setOpen] = React.useState(false);

  //used to make the drawer responsive
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawer = () => {
    setOpen(!open);
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
            pl: "22px",
            pr: "10px",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawer}
      ></Drawer>
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
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
