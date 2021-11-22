import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image, { ImageProps } from "next/image";
import { gsap } from "gsap";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import RoomIcon from "@mui/icons-material/Room";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Tooltip from "@mui/material/Tooltip";

import { SceneSpotDataType } from "types/sceneSpots";

import ImageWithFallback from "components/ImageWithFallback";

export const InfoCardContainer = muiStyled("div")(({ theme }) => ({
  position: "relative",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "379px",
  },
}));

const ActivityInfoCardContainer = muiStyled(InfoCardContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "408px",
    margin: "0 25px",
  },
}));

const BackgroundImageContainer = muiStyled("div")(({ theme }) => ({
  position: "absolute",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {},
}));

const SlideCardBackgroundImage = muiStyled(ImageWithFallback)(({ theme }) => ({
  zIndex: 0,
}));

const InfoCardActionArea = styled(CardActionArea)`
  height: 100%;
  padding: 18px;
  z-index: 20;
`;

const InfoContainer = styled(Stack)`
  padding: 0 72px;
`;

const InfoDate = styled(Typography)`
  margin-bottom: 24px;
`;
const InfoTitle = styled(Typography)`
  margin-bottom: 46px;
`;

interface Props {
  backgroundImage?: ImageProps["src"];
}

const InfoCard: React.FC<Props> = ({ backgroundImage, children }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageRef = useRef();

  return (
    <ActivityInfoCardContainer>
      <BackgroundImageContainer ref={imageRef}>
        <SlideCardBackgroundImage
          src={backgroundImage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={String("XXX")}
        />
      </BackgroundImageContainer>

      <InfoCardActionArea
        onClick={() => console.log("CLick")}
        onMouseEnter={() => {
          if (!onMobile) gsap.to(imageRef.current, { scale: 1.2 });
        }}
        onMouseLeave={() => {
          if (!onMobile) gsap.to(imageRef.current, { scale: 1.2 });
        }}
      >
        <InfoContainer textAlign={"center"}>
          <InfoDate color="common.white">2021/09/22</InfoDate>
          <InfoTitle typography={"h1"} color="common.white">
            16條自行車多元路線遊程推廣及販售
          </InfoTitle>
          <Typography color="common.white">+ Read more</Typography>
        </InfoContainer>
      </InfoCardActionArea>
    </ActivityInfoCardContainer>
  );
};
export default InfoCard;
