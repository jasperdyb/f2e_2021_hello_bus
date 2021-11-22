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

import logoYellow from "@img/logo_yellow.png";

import NavDrawer from "components/NavDrawer";

const menu = [
  { title: "最新消息", link: "/" },
  { title: "探索路線", link: "/route" },
  { title: "尋找站點", link: "/" },
  { title: "常見問題", link: "/" },
];

const Navbar: React.FC<AppBarProps> = ({ color }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <CustomAppBar color={color} position={onMobile ? "fixed" : "sticky"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        divider={onMobile ? null : <Divider orientation="vertical" flexItem />}
      >
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
              src={logoYellow}
              layout="intrinsic"
              alt="Logo"
              width={"133px"}
              height={"49px"}
            />

            <Slogan typography={"subtitle1"}>Bike Fun！自行車旅遊網</Slogan>
          </TitleLinkStack>
        </Link>

        {!onMobile &&
          menu.map((item, index) => (
            <Link key={index} href={item.link} passHref>
              <NavButton color="inherit">{item.title}</NavButton>
            </Link>
          ))}
      </Stack>
    </CustomAppBar>
  );
};

const CustomAppBar = muiStyled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  borderColor: theme.palette.divider,
  boxShadow: "none",
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  borderWidth: 1,
  borderStyle: "solid",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "transparent",
    borderColor: theme.palette.common.white,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
}));

const TitleLinkStack = muiStyled(Stack)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  margin: "19px 0",
  padding: "0 128px",
  [theme.breakpoints.down("sm")]: {
    margin: "11px 0",
    padding: "0 32px",
  },
}));

const Slogan = muiStyled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.common.black,
}));

const themedButton = muiStyled(Button)(
  ({ theme }) => `
  cursor: pointer;
  color: ${theme.palette.grey[700]}; 
  &:hover {
   background-color: ${theme.palette.primary.main}; 
   color: ${theme.palette.primary.contrastText}; 
  }
`
);

const MenuButton = muiStyled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
  borderRightWidth: 1,
  borderStyle: "solid",
  borderRadius: 0,
  padding: "0 30px",
}));

const NavButton = styled(themedButton)`
  flex-grow: 1;
  border-radius: 0;
`;

export default Navbar;
