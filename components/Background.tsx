import React from "react";
import Image from "next/image";
import { ImageProps } from "next/image";
import styled from "styled-components";

import { styled as muiStyled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

interface Props {
  image: ImageProps["src"];
  logo?: ImageProps["src"];
}

const Background: React.FC<Props> = ({ image, logo, children }) => {
  return (
    <BackgroundContainer>
      <BackgroundImageContainer>
        <BackgroundImage
          src={image}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
        <BackgroundImageEclipseContainer>
          <BackgroundImageEclipse />
        </BackgroundImageEclipseContainer>
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
                width={"420"}
                height={"140"}
                objectFit="contain"
              />
              <Slogan typography={"h1"}>全台公車動態時刻查詢網</Slogan>
            </Grid>
          )}
        </LogoContainer>

        {children}
      </BackgroundImageChildrenContainer>
    </BackgroundContainer>
  );
};
const BackgroundContainer = styled("div")`
  overflow: hidden;
`;

const BackgroundImageContainer = styled("div")`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -100;
`;

const LogoContainer = muiStyled(Grid)(({ theme }) => ({
  minHeight: 100,
  marginTop: 222,
  marginBottom: 235,
  zIndex: 0,
}));

const BackgroundImage = muiStyled(Image)(({ theme }) => ({}));

const BackgroundImageEclipseContainer = muiStyled("div")(({ theme }) => ({
  width: "200%",
  height: "700%",
  marginLeft: "-50%",
  marginTop: -1241,
  overflow: "hidden",
  position: "relative",
  justifyContent: "center",
  alignContent: "center",

  // left: "-50vw",
  zIndex: 0,
}));

const BackgroundImageEclipse = muiStyled("div")(({ theme }) => ({
  content: '""',
  width: 1945,
  height: 1945,
  margin: "auto",

  borderRadius: "50%",
  boxShadow: `0px 0px 0px 9999px ${theme.palette.common.white}`,
  zIndex: -1,
}));

const Slogan = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
    textAlign: "center",
  },
}));

const BackgroundImageChildrenContainer = styled("div")`
  position: relative;
  z-index: 0;
`;

export default Background;
