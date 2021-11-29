import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Image from "next/image";

import { useTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import RoomIcon from "@mui/icons-material/Room";

import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons/faArrowsAltH";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons/faHeart";

import { CyclingIndexDataType } from "types/cyclingRoute";
import { BusIndexDataType } from "types/bus";

import ImageWithFallback from "components/ImageWithFallback";

interface Props {
  busIndexData: BusIndexDataType;
}

const BusIndexInfoCard: React.FC<Props> = ({ busIndexData }) => {
  const theme = useTheme();

  return (
    <>
      {busIndexData && (
        <SearchInfoCard raised>
          <CardActionArea>
            <Grid direction="row" container>
              <Grid item xs={12} container padding={"16px"}>
                <Grid item xs={7} container rowSpacing={"12px"}>
                  <Grid item xs={12}>
                    <Typography typography={"h2"}>
                      {busIndexData.RouteName.Zh_tw}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      typography={"subtitle2"}
                      color={"secondary.main"}
                    >
                      {busIndexData.DepartureStopNameZh}
                      <FontAwesomeIcon icon={faArrowsAltH} />
                      {busIndexData.DestinationStopNameZh}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={5}
                  container
                  textAlign={"end"}
                  rowSpacing={"12px"}
                  justifyContent={"flex-end"}
                >
                  <Grid item xs={12}>
                    <LikeIcon icon={farHeart} />
                    {/* <LikedIcon icon={faHeart} /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent={"flex-end"}
                      alignItems={"flex-end"}
                      spacing={"7px"}
                    >
                      <Typography
                        typography={"subtitle2"}
                        color={"secondary.main"}
                      >
                        {busIndexData.City}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </SearchInfoCard>
      )}
    </>
  );
};

const SearchInfoCard = muiStyled(Card)(({ theme }) => ({
  width: "100%",
}));

const LikeIcon = muiStyled(FontAwesomeIcon)(({ theme }) => ({
  fontSize: 16,
  color: "black",
  zIndex: 10,
}));

const LikedIcon = muiStyled(LikeIcon)(({ theme }) => ({
  color: "#D43D3D",
}));

export default BusIndexInfoCard;
