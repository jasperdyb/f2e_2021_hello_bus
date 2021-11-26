import type { NextPage } from "next";
import type { ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useGetSceneSpots } from "services/sceneSpots";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import MainInfoGrid from "components/MainInfoGrid";
import InfoCard, { InfoCardContainer } from "components/InfoCard";
import MainButton from "components/MainButton";
import Layout from "components/Layout";

import Background from "components/Background";
import Navbar from "components/Navbar";
import HelloBus_light from "@img/HelloBus_light.png";
import picBgPC from "@img/picBgPC.jpg";

const Home = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Background image={picBgPC} logo={HelloBus_light}>
        <Navbar />
      </Background>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullScreenContainer>
      <Layout>{page}</Layout>
    </FullScreenContainer>
  );
};

const FullScreenContainer = styled("div")`
  height: 100vh;
  width: 100vw;
`;
export default Home;
