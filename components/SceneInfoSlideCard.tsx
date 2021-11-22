import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Image from "next/image";

import { useTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import RoomIcon from "@mui/icons-material/Room";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Tooltip from "@mui/material/Tooltip";

import banner01 from "public/img//banner01.jpg";

import { SceneSpotDataType } from "types/sceneSpots";

import ImageWithFallback from "components/ImageWithFallback";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const EnblaSlideCard = styled(Card)`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;

  cursor: pointer;
`;

const SlideCardBackgroundImage = styled(ImageWithFallback)`
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 10;
`;

const SlideCardActionArea = styled(CardActionArea)`
  height: 100%;
  padding: 18px;
  z-index: 20;
`;

const InfoGrid = styled(Grid)`
  height: 100%;
  z-index: 30;
`;

const ArrowRightAltIconLight = styled(ArrowRightAltIcon)`
  color: #eeeeee;
`;
ArrowRightAltIcon;

interface Props {
  sceneSpotData: SceneSpotDataType;
}

const SceneInfoSlideCard: React.FC<Props> = ({ sceneSpotData }) => {
  const theme = useTheme();

  return (
    <EnblaSlideCard>
      <SlideCardBackgroundImage
        src={sceneSpotData.Picture.PictureUrl1}
        loading="eager"
        layout="fill"
        objectFit="cover"
        alt={String(sceneSpotData.Name)}
      />
      <SlideCardActionArea onClick={() => console.log("CLLLLLLLick")}>
        <InfoGrid
          container
          justifyContent={"space-between"}
          alignContent={"space-between"}
        >
          <Grid item xs={12} textAlign={"end"}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <TouchAppIcon color="primary" fontSize="small" />
              <Typography color="grey.A200">1234</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            justifySelf={"flex-end"}
          >
            <Grid item>
              <Typography typography={"subtitle1"} color="grey.A200">
                {sceneSpotData.Name.split("_").pop()}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems={"center"}>
                <ArrowRightAltIconLight fontSize="inherit" color="action" />
                <Typography typography={"subtitle1"} color="grey.A200">
                  看更多
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </InfoGrid>
      </SlideCardActionArea>
    </EnblaSlideCard>
  );
};
export default SceneInfoSlideCard;
