import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import SortSelect from "components/SortSelect";
import CyclingRouteInfoCard from "components/CyclingRouteInfoCard";
import SearchPagination from "components/SearchPagination";

import { useSceneSpotContext } from "context/sceneSpot";

import { useGetCyclingRouteIndex } from "services/cyclingRoute";
import { CyclingIndexDataType } from "types/cyclingRoute";

import { useJsApiLoader } from "@react-google-maps/api";
import { useGeolocationContext } from "context/geolocation";
import { Location } from "types/geolocation";

const SearchContainer = styled(CardContent)`
  padding: 24px 48px 32px 24px;
  &:last-child {
    padding-bottom: 24px;
  }
`;

const ThemedStack = muiStyled(Stack)(
  ({ theme }) => ` border-left: 3px solid ${theme.palette.primary.main};
 
`
);

const TitleStack = styled(ThemedStack)`
  padding-left: 16px;
`;

const PaginationContainer = styled.div`
  margin-top: 64px;
`;

interface SearchFormType {
  search: string;
  address: string;
  autoPositionOn: boolean;
}

const SearchResult: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries: ["geometry"],
  });
  const { location, city, apply, searchKey } = useGeolocationContext();
  const { cyclingRoutes, isLoading, isError, mutate } =
    useGetCyclingRouteIndex(city);
  const [filteredData, setFilteredData] = useState<Array<CyclingIndexDataType>>(
    []
  );
  const [pageData, setPageData] = useState<Array<CyclingIndexDataType>>([]);
  const [page, setPage] = useState(1);

  const computeDistanceFromRoute = (cyclingLocation: Location) => {
    if (isLoaded && !loadError) {
      const fromLatlng = new window.google.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const toLatlng = new window.google.maps.LatLng(
        cyclingLocation.latitude,
        cyclingLocation.longitude
      );

      const distance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          fromLatlng,
          toLatlng
        );
      return Math.floor(distance / 100) / 10;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (searchKey) {
      console.log("=== apply search key");
      setFilteredData(
        cyclingRoutes.filter((data) => data.RouteName.indexOf(searchKey) > -1)
      );
    } else if (cyclingRoutes && !isLoading && !isError) {
      setFilteredData(cyclingRoutes);
    } else {
      setFilteredData([]);
    }
  }, [searchKey, cyclingRoutes]);

  useEffect(() => {
    console.log("=== update pageData ===");
    if (filteredData.length) {
      setPageData(
        filteredData.slice(
          process.env.NUMBER_PER_PAGE * (page - 1),
          process.env.NUMBER_PER_PAGE * page
        )
      );
    } else {
      setPageData([]);
    }
    // console.log(window.google.maps.geometry.spherical.computeDistanceBetween);
    return () => {
      setPageData([]);
    };
  }, [page, filteredData]);

  useEffect(() => {
    if (apply) {
      console.log("=== mutate ===");
      mutate();
    }
  }, [apply, mutate]);

  useEffect(() => {
    console.log("===   pageData ===", pageData);
  }, [pageData]);

  return (
    <>
      <Card raised>
        <SearchContainer>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginBottom={"32px"}
          >
            <TitleStack spacing={"8px"}>
              <Typography typography={"h1"} color={"primary"}>
                搜尋結果
              </Typography>
              <Typography>找到離您最近的自行車車道</Typography>
            </TitleStack>
            <SortSelect />
          </Stack>

          <Grid container spacing={"28px"}>
            {!isLoading &&
            !isError &&
            cyclingRoutes &&
            cyclingRoutes.length === 0 ? (
              <Typography>很抱歉，沒有找到相關的路線。</Typography>
            ) : (
              pageData.map((cyclingRouteData, index) => (
                <Grid key={index} item xs={4}>
                  <CyclingRouteInfoCard
                    cyclingRouteData={cyclingRouteData}
                    distance={computeDistanceFromRoute(
                      cyclingRouteData.Geometry[0]
                    )}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </SearchContainer>
      </Card>
      <PaginationContainer>
        {filteredData.length ? (
          <SearchPagination
            page={page}
            dataLength={filteredData.length}
            onChange={(_, page) => {
              setPage(page);
            }}
          />
        ) : null}
      </PaginationContainer>
    </>
  );
};

export default SearchResult;
