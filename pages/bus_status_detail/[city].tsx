import type { NextPage } from "next";
import type { ReactElement } from "react";
import React from "react";
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
} from "services/bus";

const BusStatusDetail = () => {
  const router = useRouter();
  const { city, route } = router.query;
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [Direction, setDirection] = React.useState(0);

  const {
    stops,
    isLoading: isStopsLoading,
    isError: isStopsError,
  } = useGetBusRouteStops(city, route);

  const Stops = React.useMemo(
    () =>
      stops && !isStopsLoading && !isStopsError
        ? stops.find((r) => r.Direction === Direction).Stops
        : [],
    [stops, Direction]
  );

  const {
    routes,
    isLoading: isRoutesLoading,
    isError: isRoutesError,
  } = useGetBusRouteInfo(city, route);

  const RoutInfo = React.useMemo(
    () => (routes && !isRoutesLoading && !isRoutesError ? routes[0] : null),
    [routes]
  );

  React.useEffect(() => {
    console.log(city);
    console.log(route);
  }, [city, route]);

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
                  <BusTimeTableDialog />
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
          stops={Stops}
          Direction={Direction}
          setDirection={setDirection}
        />
        <BusDetailRealTimeStatusMap stops={Stops} />
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
