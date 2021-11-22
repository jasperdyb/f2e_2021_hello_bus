import type { NextPage } from "next";
import type { ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useGetSceneSpots } from "services/sceneSpots";

import { styled as muiStyled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Layout from "components/Layout";

import Navbar from "components/Navbar";
import NavBreadCrumbs from "components/NavBreadCrumbs";
import SearchPanel from "components/SearchPanel";
import SearchResult from "components/SearchResult";

import bg02 from "@img/bg02.jpg";
import { useGetCyclingRouteIndex } from "services/cyclingRoute";

const HeaderImageContainer = styled("div")`
  position: relative;
  height: 300px;
  margin-top: -100px;
  margin-bottom: -50px;
`;

const SearchPanelContainer = styled.div`
  margin-bottom: 40px;
`;
const SearchResultContainer = styled.div`
  margin-bottom: 208px;
`;

const Route = () => {
  return (
    <>
      <HeaderImageContainer>
        <Image
          src={bg02}
          alt="background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </HeaderImageContainer>
      <Navbar />
      <Container>
        <NavBreadCrumbs />
        <SearchPanelContainer>
          <SearchPanel />
        </SearchPanelContainer>
        <SearchResultContainer>
          <SearchResult />
        </SearchResultContainer>
      </Container>
    </>
  );
};

Route.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Route;
