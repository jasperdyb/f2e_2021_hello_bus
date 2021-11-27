import type { NextPage } from "next";
import type { ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useGetSceneSpots } from "services/sceneSpots";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Layout from "components/Layout";
import ButtonAnimatedBus from "components/ButtonAnimatedBus";

import Background from "components/Background";
import Navbar, { menu } from "components/Navbar";
import HelloBus_light from "@img/HelloBus_light.png";
import picBgPC from "@img/picBgPC.jpg";

const Home = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Background image={picBgPC} logo={HelloBus_light}>
        <Navbar />
        <Stack direction={"row"} justifyContent={"center"} spacing={11}>
          {menu.map((item, index) => (
            <Stack key={index} alignContent={"center"} textAlign={"center"}>
              <ButtonAnimatedBus icon={item.icon} />
              <Typography mt={1.5}>{item.title}</Typography>
            </Stack>
          ))}
        </Stack>
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
