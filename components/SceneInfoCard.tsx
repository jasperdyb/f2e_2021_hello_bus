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

const SceneTypeChip = styled(Chip)`
  color: #fff;
`;

const Description = styled("div")`
  height: 100px;
`;

const OpenTimeContainer = styled("div")`
  max-width: 150px;
  text-overflow: ellipsis;
`;

interface Props {
  sceneSpotData: SceneSpotDataType;
}

const SceneInfoCard: React.FC<Props> = ({ sceneSpotData }) => {
  const theme = useTheme();

  const [sceneType, setSceneType] = useState<String>("");

  useEffect(() => {
    setSceneType(
      sceneSpotData.Class1
        ? sceneSpotData.Class1
        : sceneSpotData.Class2
        ? sceneSpotData.Class2
        : sceneSpotData.Class3
        ? sceneSpotData.Class3
        : "景點"
    );
  }, []);

  return (
    <>
      {sceneSpotData && (
        <Card raised>
          <CardActionArea>
            <Grid direction="row" container>
              <Grid item xs={5}>
                <div
                  style={{
                    position: "relative",
                    height: "240px",
                    width: "100%",
                  }}
                >
                  <ImageWithFallback
                    src={sceneSpotData.Picture.PictureUrl1}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="search page banner"
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={7}
                container
                direction="column"
                padding="18px"
                rowSpacing={"8px"}
              >
                <Grid item>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignContent={"center"}
                  >
                    <Typography typography={"h1"} color="info.main">
                      {sceneSpotData.Name.split("_").pop()}
                    </Typography>
                    <SceneTypeChip label={sceneType} color="primary" />
                  </Stack>
                </Grid>
                <Grid item flex={1}>
                  <Description>
                    <Typography color="grey.600" paragraph>
                      {`${sceneSpotData.DescriptionDetail.slice(0, 75)} ...`}
                    </Typography>
                  </Description>
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        spacing={"7px"}
                      >
                        <RoomIcon color="info" fontSize="small" />
                        <Typography typography={"subtitle1"} color="grey.600">
                          {sceneSpotData.City}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        spacing={"7px"}
                      >
                        <WatchLaterIcon color="info" fontSize="small" />
                        <OpenTimeContainer>
                          <Tooltip
                            title={sceneSpotData.OpenTime}
                            placement="top"
                          >
                            <Typography
                              typography={"subtitle1"}
                              color="grey.600"
                              noWrap
                            >
                              {sceneSpotData.OpenTime
                                ? sceneSpotData.OpenTime
                                : "未提供"}
                            </Typography>
                          </Tooltip>
                        </OpenTimeContainer>
                      </Stack>
                    </Stack>
                    <Stack direction="row" alignItems={"center"}>
                      <TouchAppIcon color="primary" fontSize="small" />
                      <Typography color="grey.600">1234</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};
export default SceneInfoCard;
