import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";

import Typography from "@mui/material/Typography";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const NavBreadCrumbContainer = styled("div")`
  margin-top: 18px;
  margin-bottom: 30px;
`;

const SceneSpotsTitle = styled(Typography)`
  margin-bottom: 18px;
`;

const SceneSpotsCarouselContainer = styled("div")`
  margin-bottom: 50px;
`;

const Search: NextPage = () => {
  return (
    <>
      <Head>
        <title>TaiwanTravel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar color="secondary" />

      <Footer color={"secondary"}>
        <Typography>
          TaiwanTravel © 2021 Designer Vum. Engineer Jasper Chen. All rights
          reserved.
        </Typography>
      </Footer>
    </>
  );
};

export default Search;
