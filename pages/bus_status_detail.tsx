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
import NavBreadCrumbs from "components/NavBreadCrumbs";
import SearchAutoComplete from "components/SearchAutoComplete";

import Background from "components/Background";
import Navbar, { menu } from "components/Navbar";
import ButtonAnimatedBus from "components/ButtonAnimatedBus";
import BusDetailRealTimeStatus from "components/BusDetailRealTimeStatus";
import BusDetailRealTimeStatusMap from "components/BusDetailRealTimeStatusMap";

import HelloBus_dark from "@img/HelloBus_dark.png";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons/faArrowsAltH";

const test = {
  RouteUID: "TPE16111",
  RouteID: "16111",
  HasSubRoutes: true,
  BusRouteType: 11,
  RouteName: {
    Zh_tw: "307",
    En: "307",
  },
  DepartureStopNameZh: "板橋",
  DepartureStopNameEn: "Banqiao",
  DestinationStopNameZh: "撫遠街",
  DestinationStopNameEn: "Fuyuan St.",
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
              <Stack
                width={"100%"}
                direction={"row"}
                alignItems={"center"}
                spacing={1}
              >
                <ButtonAnimatedBus size={44} icon={faClock}></ButtonAnimatedBus>
                <Typography typography={"h2"}>公車班表</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={6}>
            <Stack textAlign={"end"}>
              <RoutIdTypography>{test.RouteID}</RoutIdTypography>
              <Typography typography={"h2"}>
                {test.DepartureStopNameZh}{" "}
                <FontAwesomeIcon icon={faArrowsAltH} />{" "}
                {test.DestinationStopNameZh}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </BusStatusHeader>
      <BusStatusDetailContainer
        flexDirection={"row"}
        justifyContent={"flex-end"}
      >
        <BusDetailRealTimeStatus />
        <BusDetailRealTimeStatusMap />
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
