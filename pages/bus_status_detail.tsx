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
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";

import Layout from "components/Layout";
import ButtonAnimatedBus from "components/ButtonAnimatedBus";
import NavBreadCrumbs from "components/NavBreadCrumbs";
import SearchAutoComplete from "components/SearchAutoComplete";

import Background from "components/Background";
import Navbar, { menu } from "components/Navbar";
import BusDetailRealTimeStatus from "components/BusDetailRealTimeStatus";

import HelloBus_dark from "@img/HelloBus_dark.png";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import RoomIcon from "@mui/icons-material/Room";

import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons/faArrowsAltH";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons/faHeart";

const test = {
  RouteUID: "TPE10132",
  RouteID: "10132",
  HasSubRoutes: true,
  BusRouteType: 11,
  RouteName: {
    Zh_tw: "234",
    En: "234",
  },
  DepartureStopNameZh: "板橋",
  DepartureStopNameEn: "Banqiao",
  DestinationStopNameZh: "西門",
  DestinationStopNameEn: "Ximen",
  City: "Taipei",
  CityCode: "TPE",
  UpdateTime: "2021-11-26T18:33:53+08:00",
  VersionID: 1336,
};

const BusStatusDetail = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Navbar icon={HelloBus_dark} navTextColor="primary" />

      <NavbarContainer>
        <NavBreadCrumbs color="primary" />
      </NavbarContainer>
      <BusStatusHeader>
        <Grid container>
          <Grid item sm={6}>
            <Stack height={"100%"} justifyContent={"flex-end"}>
              <Typography typography={"h2"}>公車班表</Typography>
            </Stack>
          </Grid>
          <Grid item sm={6}>
            <Stack textAlign={"end"}>
              <RoutIdTypography>{test.RouteID}</RoutIdTypography>
              <Typography typography={"h2"}>
                {test.DepartureStopNameZh}
                <FontAwesomeIcon icon={faArrowsAltH} />
                {test.DestinationStopNameZh}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </BusStatusHeader>
      <BusStatusDetailContainer
        flexDirection={"row"}
        justifyContent={"space-evenly"}
      >
        <BusDetailRealTimeStatus />
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
