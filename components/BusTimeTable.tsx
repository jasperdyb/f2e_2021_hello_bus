import React, { useState, useEffect, useMemo } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent, { cardContentClasses } from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader, { cardHeaderClasses } from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import SortSelect from "components/SortSelect";
import CyclingRouteInfoCard from "components/CyclingRouteInfoCard";
import SearchPagination from "components/SearchPagination";
import BusIndexInfoCard from "components/BusIndexInfoCard";

import { BusIndexDataType } from "types/bus";
import { testBusTimeTable, testRouteInfo } from "services/bus";

import { useJsApiLoader } from "@react-google-maps/api";
import { useGeolocationContext } from "context/geolocation";
import { Location } from "types/geolocation";

interface Props {
  title?: string;
  route?: { toDestinationRoute: any; toDepartureRoute: any };

  DepartureStopName: string;
  DestinationStopName: string;
}

const BusTimeTable: React.FC<Props> = ({
  title,
  route,
  DepartureStopName,
  DestinationStopName,
}) => {
  const router = useRouter();

  const toDestinationTimeTable = useMemo(
    () => (route ? route.toDestinationRoute : []),
    [route]
  );

  const toDepartureTimeTable = useMemo(
    () => (route ? route.toDepartureRoute : []),
    [route]
  );

  return (
    <BusTimeTableCard>
      {title && <SearchCardHeader title={title} />}
      <BusTimeTableContent>
        <Grid container spacing={3} paddingLeft={1} paddingRight={1}>
          <Grid item sm={6}>
            <BusTimeTableList>
              <BusTimeListHeader>
                {DestinationStopName && (
                  <Typography>
                    <ColorText>往 {DestinationStopName}</ColorText>
                  </Typography>
                )}
              </BusTimeListHeader>
              {toDestinationTimeTable.map((item, index) => (
                <BusTimeListItem key={index} index={index}>
                  <Typography> {item.StartTime}</Typography>
                </BusTimeListItem>
              ))}
            </BusTimeTableList>
          </Grid>
          <Grid item sm={6}>
            <BusTimeTableList>
              <BusTimeListHeader>
                {DepartureStopName && (
                  <Typography>
                    <ColorText>往 {DepartureStopName}</ColorText>
                  </Typography>
                )}
              </BusTimeListHeader>
              {toDepartureTimeTable.map((item, index) => (
                <BusTimeListItem key={index} index={index}>
                  <Typography>{item.StartTime}</Typography>
                </BusTimeListItem>
              ))}
            </BusTimeTableList>
          </Grid>
        </Grid>
      </BusTimeTableContent>
    </BusTimeTableCard>
  );
};

const BusTimeTableCard = muiStyled(Card)(({ theme }) => ({ flexGrow: 1 }));

const BusTimeTableContent = muiStyled(CardContent)(({ theme }) => ({
  padding: 0,
  [`&.${cardContentClasses.root}:last-child`]: {
    paddingBottom: 0,
  },
}));

const BusTimeTableList = muiStyled(List)(({ theme }) => ({
  "& ul": { padding: 0 },
  textAlign: "center",
}));

const BusTimeListHeader = muiStyled("div")(({ theme }) => ({
  paddingTop: 17,
  paddingBottom: 17,
}));

interface CustomListItemProps extends ListItemProps {
  index: number;
}

const BusTimeListItem = muiStyled(ListItem)<CustomListItemProps>(
  ({ theme, index }) => ({
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: index % 2 == 0 && "#D8DAE0",
  })
);

const SearchCardHeader = muiStyled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  [`& .${cardHeaderClasses.title}`]: {
    fontSize: theme.typography.fontSize,
  },
}));

const ColorText = muiStyled("span")<{ color?: string }>(({ theme, color }) => ({
  color: color || theme.palette.secondary.main,
}));

export default BusTimeTable;
