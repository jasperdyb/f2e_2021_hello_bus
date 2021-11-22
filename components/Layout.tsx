import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import Background from "components/Background";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

interface Props {}
const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Head>
        <title>TaiwanTravel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer>
        <Typography>
          BikeFun ©{onMobile && <br />} 2021 Designer Vum. Engineer Jasper Chen.
          All rights reserved.
        </Typography>
      </Footer>
    </>
  );
};
export default Layout;
