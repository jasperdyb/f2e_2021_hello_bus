import type { NextPage } from "next";
import type { ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
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
import SearchSelect from "components/SearchSelect";

import { CityOptions } from "types/bus";

const BusStatus = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Navbar />
      <NavbarContainer>
        <NavBreadCrumbs />
        <Grid
          container
          alignItems={"center"}
          paddingLeft={"277px"}
          paddingRight={"277px"}
          rowSpacing={1}
          columnSpacing={2}
        >
          <Grid item sm={12}>
            <Typography color={"secondary"}>
              *選擇縣市有助於您更快找到路線
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <SearchAutoComplete
              disablePortal
              options={CityOptions}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="請選擇縣市或手動輸入關鍵字"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item sm={6}>
            <SearchAutoComplete
              disablePortal
              options={CityOptions}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="請選擇路線或手動輸入關鍵字"
                  variant="outlined"
                />
              )}
              freeSolo
              popupIcon={<SearchIcon />}
              rotateIndicatorOnOpen={false}
            />
          </Grid>
        </Grid>
      </NavbarContainer>
    </>
  );
};

BusStatus.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullScreenContainer>
      <Layout>{page}</Layout>
    </FullScreenContainer>
  );
};

const FullScreenContainer = styled("div")`
  height: 100vh;
  width: 100vw;
`;

const NavbarContainer = muiStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  miHeight: 251,
  width: "100%",
  borderEndEndRadius: 20,
  borderEndStartRadius: 20,
  paddingTop: 98,
  paddingRight: 50,
  paddingLeft: 50,
  paddingBottom: 30,
}));

export default BusStatus;
