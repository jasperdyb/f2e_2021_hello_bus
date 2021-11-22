import React from "react";
import Image from "next/image";
import { ImageProps } from "next/image";
import styled from "styled-components";

import { styled as muiStyled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

import { Logo } from "@svg";
import logoWhite from "@img/logo_white.png";

const BackgroundContainer = styled("div")`
  overflow: hidden;
`;

const BackgroundImageContainer = styled("div")`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -100;
`;

const LogoContainer = styled(Grid)`
  min-height: 100px;
  margin-top: 219px;
  margin-bottom: 224px;
  z-index: 0;
`;

const ColoredTypography = muiStyled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.common.white};
`
);

const Slogan = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "end",
  marginRight: "-101px",
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
    textAlign: "center",
  },
}));

const BackgroundImageChildrenContainer = styled("div")`
  position: relative;
  z-index: 0;
`;

interface Props {
  image: ImageProps["src"];
  logo?: ImageProps["src"];
}

const Background: React.FC<Props> = ({ image, logo, children }) => {
  return (
    <BackgroundContainer>
      <BackgroundImageContainer>
        <Image
          src={image}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
        />
      </BackgroundImageContainer>
      <BackgroundImageChildrenContainer>
        <LogoContainer
          container
          justifyContent={"center"}
          alignContent={"center"}
        >
          {logo && (
            <Grid item>
              <Image
                src={logo}
                alt="Logo"
                width={"545"}
                height={"165"}
                objectFit="contain"
              />
              <Slogan typography={"h1"}>Bike Fun！自行車旅遊網</Slogan>
            </Grid>
          )}
        </LogoContainer>

        {children}
      </BackgroundImageChildrenContainer>
    </BackgroundContainer>
  );
};

export default Background;
