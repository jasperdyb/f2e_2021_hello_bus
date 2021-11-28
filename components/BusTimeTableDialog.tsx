import type { NextPage } from "next";
import type { ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
import { CityOptions } from "types/bus";
import { useGetSceneSpots } from "services/sceneSpots";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import NavBreadCrumbs from "components/NavBreadCrumbs";
import BusTimeTable from "components/BusTimeTable";

import Navbar, { menu } from "components/Navbar";
import MainDialog from "components/MainDialog";
import ButtonAnimatedBus from "components/ButtonAnimatedBus";

import HelloBus_dark from "@img/HelloBus_dark.png";

import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { testBusTimeTable } from "services/bus";

const toDestinationRoute = testBusTimeTable[0];
const toDestinationRouteWeekDay = toDestinationRoute.Frequencys.filter(
  (t) => !(t.ServiceDay.Sunday || t.ServiceDay.Saturday)
);

const toDestinationRouteWeekEnd = toDestinationRoute.Frequencys.filter(
  (t) => t.ServiceDay.Sunday || t.ServiceDay.Saturday
);

const toDepartureRoute = testBusTimeTable[1];
const toDepartureRouteWeekDay = toDepartureRoute.Frequencys.filter(
  (t) => !(t.ServiceDay.Sunday || t.ServiceDay.Saturday)
);

const toDepartureRouteWeekEnd = toDepartureRoute.Frequencys.filter(
  (t) => t.ServiceDay.Sunday || t.ServiceDay.Saturday
);

const BusTimeTableDialog = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <MainDialog
      title="5053 班次表"
      ButtonComponent={({ onClick }) => (
        <ButtonAnimatedBus size={44} icon={faClock} onClick={onClick} />
      )}
      fullWidth
      maxWidth={"md"}
    >
      <BusTimeTableContainer container spacing={2}>
        <Grid item sm={6}>
          <BusTimeTable
            title="平日"
            route={{
              toDestinationRoute: toDestinationRouteWeekDay,
              toDepartureRoute: toDepartureRouteWeekDay,
            }}
          ></BusTimeTable>
        </Grid>
        <Grid item sm={6}>
          <BusTimeTable
            title="假日"
            route={{
              toDestinationRoute: toDestinationRouteWeekEnd,
              toDepartureRoute: toDepartureRouteWeekEnd,
            }}
          ></BusTimeTable>
        </Grid>
      </BusTimeTableContainer>
    </MainDialog>
  );
};

const BusTimeTableContainer = muiStyled(Grid)(({ theme }) => ({
  paddingRight: 113,
  paddingLeft: 113,
}));

export default BusTimeTableDialog;
