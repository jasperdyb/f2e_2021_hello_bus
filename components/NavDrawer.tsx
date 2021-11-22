import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { PropTypes } from "@mui/material";

import Drawer, { DrawerProps } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface Props extends DrawerProps {
  menu: Array<{ title: string; link: string }>;
}

const NavDrawer: React.FC<Props> = ({ menu, open, onClose }) => {
  const theme = useTheme();

  const menuList = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menu.map((item, index) => (
          <Link href={item.link} passHref key={index}>
            <MenuListItem>
              <ListItemText primary={item.title} />
            </MenuListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <MenuDrawer anchor={"left"} open={open} onClose={onClose}>
      {menuList()}
    </MenuDrawer>
  );
};

const MenuDrawer = muiStyled(Drawer)(({ theme }) => ({
  //
  "& .MuiDrawer-paper": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
  },
}));

const MenuListItem = muiStyled(ListItemButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default NavDrawer;
