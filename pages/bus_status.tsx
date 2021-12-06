import type { NextPage } from "next";
import React from "react";
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
import Box from "@mui/material/Box";
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
import SearchResult from "components/SearchResult";
import BusSearchDialPad from "components/BusSearchDialPad";

import { CityOptions, CityOptionType } from "types/bus";
import { BusSearchFormContextProvider } from "context/busSearchForm";

import { useFormContext, Controller } from "react-hook-form";

import { useGetBusRouteIndex } from "services/bus";
const BusStatus = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { control, setValue } = useFormContext();

  return (
    <>
      <Navbar />
      <BusStatusContainer>
        <NavbarContainer>
          <NavBreadCrumbs />
          <Container maxWidth="md">
            <Grid
              container
              alignItems={"center"}
              // paddingLeft={"277px"}
              // paddingRight={"277px"}
              rowSpacing={1}
              columnSpacing={2}
            >
              <Grid item sm={12}>
                <Typography color={"secondary"}>
                  *選擇縣市有助於您更快找到路線
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <SearchAutoComplete
                      disablePortal
                      disableClearable
                      options={CityOptions}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="請選擇縣市或手動輸入關鍵字"
                          variant="outlined"
                        />
                      )}
                      value={CityOptions.find((c) => c.searchString === value)}
                      onChange={(event: any, newValue: CityOptionType) => {
                        onChange(newValue.searchString);
                        setValue("keyword", "");
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="keyword"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <SearchAutoComplete
                      disablePortal
                      options={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="請選擇路線或手動輸入關鍵字"
                          variant="outlined"
                        />
                      )}
                      freeSolo
                      disableClearable
                      forcePopupIcon
                      popupIcon={<SearchIcon />}
                      rotateIndicatorOnOpen={false}
                      value={value}
                      inputValue={value}
                      onChange={onChange}
                      onInputChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Container>
        </NavbarContainer>
        <SearchResultContainer maxWidth="md">
          <SearchResultGrid
            container
            // alignItems={"stretch"}
            rowSpacing={1}
            columnSpacing={2}
          >
            <Grid item sm={6}>
              <SearchResult />
            </Grid>
            <Grid item sm={6}>
              <BusSearchDialPad />
            </Grid>
          </SearchResultGrid>
        </SearchResultContainer>
      </BusStatusContainer>
    </>
  );
};

BusStatus.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullScreenContainer>
      <Layout>
        <BusSearchFormContextProvider>{page}</BusSearchFormContextProvider>
      </Layout>
    </FullScreenContainer>
  );
};

const FullScreenContainer = styled("div")`
  height: 100vh;
  width: 100vw;
`;

const NavbarContainer = muiStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  // minHeight: 251,
  width: "100%",
  borderEndEndRadius: 20,
  borderEndStartRadius: 20,
  paddingTop: 98,
  paddingRight: 50,
  paddingLeft: 50,
  paddingBottom: 30,
}));

const BusStatusContainer = muiStyled("div")(({ theme }) => ({
  height: "100vh",
  paddingBottom: 70,
  overflowX: "hidden",
  flex: 1,
  flexDirection: "column",
}));

const SearchResultContainer = muiStyled(Container)(({ theme }) => ({
  paddingTop: 44,
  flexGrow: 1,
}));

const SearchResultGrid = muiStyled(Grid)(({ theme }) => ({}));

export default BusStatus;
