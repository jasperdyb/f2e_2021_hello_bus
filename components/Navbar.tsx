import * as React from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
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

import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

export const menu = [
  { title: "公車動態", label: "公車動態", link: "/bus_status", icon: faBus },
  { title: "附近站點", label: "附近站點", link: "/", icon: faMapMarkerAlt },
  { title: "班表查詢", label: "班表查詢", link: "/", icon: faClock },
  { title: "我的收藏", label: "我的收藏", link: "/", icon: faHeart },
];

interface Props extends AppBarProps {
  icon?: ImageProps["src"];

  navTextColor?: string;
}

const Navbar: React.FC<Props> = ({
  color,
  position = "fixed",
  icon = HelloBus_light,
  navTextColor,
}) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <CustomAppBar color={color} position={position}>
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
              src={icon}
              layout="intrinsic"
              alt="Logo"
              width={160}
              height={47}
            />
          </TitleLinkStack>
        </Link>

        {!onMobile && (
          <Stack direction={"row"} spacing={6}>
            {menu.map((item, index) => (
              <Link key={index} href={item.link} passHref>
                <NavButton color="inherit">
                  <Typography typography={"h2"} color={navTextColor}>
                    {item.title}
                  </Typography>
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
  // ":hover": {
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.primary.contrastText,
  // },
}));

export default Navbar;
