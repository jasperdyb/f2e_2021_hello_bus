import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { PropTypes } from "@mui/material";

import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HelloBus_light from "@img/HelloBus_light.png";

import NavDrawer from "components/NavDrawer";

const menu = [
  { title: "公車動態", link: "/" },
  { title: "附近站點", link: "/" },
  { title: "班表查詢", link: "/" },
  { title: "我的收藏", link: "/" },
];

const Navbar: React.FC<AppBarProps> = ({ color }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <CustomAppBar color={color} position={"fixed"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {onMobile && (
          <>
            <MenuButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </MenuButton>
            <NavDrawer
              menu={menu}
              open={menuOpen}
              onClose={() => {
                setMenuOpen(false);
              }}
            />
          </>
        )}
        <Link href={"/"} passHref>
          <TitleLinkStack textAlign={"center"}>
            <Image
              src={HelloBus_light}
              layout="intrinsic"
              alt="Logo"
              width={160}
              height={47}
            />
          </TitleLinkStack>
        </Link>

        {!onMobile && (
          <Stack direction={"row"} spacing={"50px"}>
            {menu.map((item, index) => (
              <Link key={index} href={item.link} passHref>
                <NavButton color="inherit">
                  <Typography typography={"h2"}> {item.title}</Typography>
                </NavButton>
              </Link>
            ))}
          </Stack>
        )}
        <Box />
      </Stack>
    </CustomAppBar>
  );
};

const CustomAppBar = muiStyled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.common.white,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {},
}));

const TitleLinkStack = muiStyled(Stack)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  padding: "24px 0 19px 50px",
  [theme.breakpoints.down("sm")]: {
    margin: "11px 0",
    padding: "0 32px",
  },
}));

const MenuButton = muiStyled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
  borderRightWidth: 1,
  borderStyle: "solid",
  borderRadius: 0,
  padding: "0 30px",
}));

const NavButton = muiStyled(IconButton)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.common.white,
  flexGrow: 1,
  borderRadius: 0,
  ":hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default Navbar;
