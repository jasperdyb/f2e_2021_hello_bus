import type { NextPage } from "next";
import type { ReactElement } from "react";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { CityOptions } from "types/bus";
import { useGetSceneSpots } from "services/sceneSpots";
import { useRouter } from "next/router";
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
import BusDetailRealTimeStatus from "components/BusDetailRealTimeStatus";
import BusDetailRealTimeStatusMap from "components/BusDetailRealTimeStatusMap";
import BusTimeTableDialog from "components/BusTimeTableDialog";

import HelloBus_dark from "@img/HelloBus_dark.png";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons/faArrowsAltH";

import {
  testRouteInfo,
  useGetBusRouteStops,
  useGetBusRouteInfo,
  useGetBusRouteShape,
  useGetBusRouteSchedule,
  useGetBusRouteEstimatedTimeOfArrival,
  useGetBusRouteBusRealTimeByFrequency,
  findNearestStop,
  parseBusRouteData,
} from "services/bus";

import {
  PointType,
  BusIndexDataType,
  BusStopsDataType,
  BusRouteDataType,
  BusShapeDataType,
  BusScheduleDataType,
  BusN1EstimateTimeDataType,
  BusA1DataType,
} from "types/bus";

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const BusStatusDetail = () => {
  const router = useRouter();
  const { city, route } = router.query;
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [Direction, setDirection] = useState(0);
  const [InitStop, setInitStop] = useState<BusN1EstimateTimeDataType>();
  const [InitStopUpdated, setInitStopUpdated] = useState(false);
  const [ZoomInStop, setZoomInStop] = useState<BusN1EstimateTimeDataType>();

  const {
    stops,
    isLoading: isStopsLoading,
    isError: isStopsError,
  } = useGetBusRouteStops(city, route);

  const Stops = useMemo(
    () =>
      stops && !isStopsLoading && !isStopsError
        ? stops.find((r) => r.Direction === Direction).Stops
        : [],
    [stops, Direction]
  );

  const {
    estimatedTimeOfArrival,
    isLoading: isEstimateLoading,
    isError: isEstimateError,
  } = useGetBusRouteEstimatedTimeOfArrival(city, route);

  const EstimatedTimeOfArrival = useMemo(
    () =>
      estimatedTimeOfArrival && !isEstimateLoading && !isEstimateError
        ? estimatedTimeOfArrival.filter((r) => r.Direction === Direction)
        : [],
    [estimatedTimeOfArrival, Direction]
  );

  useEffect(() => {
    const nearestStop: BusN1EstimateTimeDataType = findNearestStop(
      EstimatedTimeOfArrival
    );

    if (nearestStop && !InitStopUpdated) {
      setInitStop(nearestStop);
      setInitStopUpdated(true);
    }
  }, [EstimatedTimeOfArrival, InitStopUpdated]);

  useEffect(() => {
    setInitStopUpdated(false);
  }, [Direction]);

  const {
    routeShapes,
    isLoading: isShapeLoading,
    isError: isShapeError,
  } = useGetBusRouteShape(city, route);

  const Shapes = useMemo(
    () =>
      routeShapes && !isShapeLoading && !isShapeError && routeShapes.length
        ? parseBusRouteData(routeShapes[0].Geometry)
        : [],
    [routeShapes, Direction]
  );

  const {
    routes,
    isLoading: isRoutesLoading,
    isError: isRoutesError,
  } = useGetBusRouteInfo(city, route);

  const RoutInfo = useMemo(
    () => (routes && !isRoutesLoading && !isRoutesError ? routes[0] : null),
    [routes]
  );

  const {
    schedules,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
  } = useGetBusRouteSchedule(city, route);

  const Schedules = useMemo(
    () =>
      schedules && !isScheduleLoading && !isScheduleError && schedules.length
        ? {
            toDestinationRoute: schedules.find((s) => s.Direction === 0),
            toDepartureRoute: schedules.find((s) => s.Direction === 1),
          }
        : {
            toDestinationRoute: null,
            toDepartureRoute: null,
          },
    [schedules, Direction]
  );

  const {
    buses,
    isLoading: isBusLoading,
    isError: isBusError,
  } = useGetBusRouteBusRealTimeByFrequency(city, route);

  const Buses = useMemo(
    () =>
      buses && !isBusLoading && !isBusError
        ? buses.filter((r) => r.Direction === Direction)
        : [],
    [buses, Direction]
  );

  return (
    <>
      <Navbar icon={HelloBus_dark} navTextColor="primary" />

      <NavbarContainer>
        <NavBreadCrumbs color="primary" />
      </NavbarContainer>
      <BusStatusHeader>
        {RoutInfo && (
          <Grid container>
            <Grid item sm={6}>
              <Stack height={"100%"} justifyContent={"flex-end"}>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <BusTimeTableDialog
                    Schedules={Schedules}
                    DepartureStopName={RoutInfo.DepartureStopNameZh}
                    DestinationStopName={RoutInfo.DestinationStopNameZh}
                  />
                  <Typography typography={"h2"}>公車班表</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item sm={6}>
              <Stack textAlign={"end"}>
                <RoutIdTypography>{RoutInfo.RouteName.Zh_tw}</RoutIdTypography>
                <Typography typography={"h2"}>
                  {RoutInfo.DepartureStopNameZh}{" "}
                  <FontAwesomeIcon icon={faArrowsAltH} />{" "}
                  {RoutInfo.DestinationStopNameZh}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}
      </BusStatusHeader>
      <BusStatusDetailContainer
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={3}
      >
        <BusDetailRealTimeStatus
          stops={EstimatedTimeOfArrival}
          InitStop={InitStop}
          Direction={Direction}
          setDirection={setDirection}
          setZoomInStop={(stop: BusN1EstimateTimeDataType) =>
            setZoomInStop(stop)
          }
        />
        <BusDetailRealTimeStatusMap
          stops={Stops}
          routeShape={Shapes}
          buses={Buses}
          InitStop={InitStop}
          ZoomInStop={ZoomInStop}
          Direction={Direction}
        />
      </BusStatusDetailContainer>
    </>
  );
};

BusStatusDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullScreenContainer>
      <Layout>{page}</Layout>
    </FullScreenContainer>
  );
};

const FullScreenContainer = styled("div")`
  height: 100vh;
  width: 100vw;
  padding-bottom: 70px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = muiStyled("div")(({ theme }) => ({
  width: "100%",

  paddingRight: 50,
  paddingLeft: 50,
}));

const BusStatusContainer = muiStyled("div")(({ theme }) => ({
  height: "100vh",
  flexDirection: "column",
  display: "flex",
  paddingBottom: 70,
}));

const BusStatusHeader = muiStyled(Grid)(({ theme }) => ({
  color: theme.palette.common.white,
  paddingRight: 277,
  paddingLeft: 277,
  backgroundColor: theme.palette.primary.main,
  paddingBottom: 42,
  paddingTop: 24,
  borderStartEndRadius: 20,
  borderStartStartRadius: 20,
  marginBottom: -20,
}));

const BusStatusDetailContainer = muiStyled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderStartEndRadius: 20,
  borderStartStartRadius: 20,
  flexGrow: 1,
  overflow: "hidden",
}));

const RoutIdTypography = muiStyled(Typography)(({ theme }) => ({
  fontSize: 60,
}));

export default BusStatusDetail;
