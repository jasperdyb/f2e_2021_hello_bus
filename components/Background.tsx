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
        <BackgroundImageEclipse />
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

const LogoContainer = styled(Grid)`
  min-height: 100px;
  margin-top: 219px;
  margin-bottom: 224px;
  z-index: 0;
`;

const BackgroundImage = muiStyled(Image)(({ theme }) => ({}));

const BackgroundImageEclipse = muiStyled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",

  zIndex: 0,

  "&:before": {
    content: '""',
    position: "absolute",
    top: -1241,
    left: -1945 / 8,
    width: 1945,
    height: 1945,

    borderRadius: "50%",
    boxShadow: "0px 0px 0px 9999px #FFF",
    zIndex: -1,
  },
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
