import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent, { cardContentClasses } from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import SortSelect from "components/SortSelect";
import CyclingRouteInfoCard from "components/CyclingRouteInfoCard";
import SearchPagination from "components/SearchPagination";
import BusIndexInfoCard from "components/BusIndexInfoCard";

import { BusIndexDataType } from "types/bus";
import { mockBusRoutes } from "services/bus";

import { useJsApiLoader } from "@react-google-maps/api";
import { useGeolocationContext } from "context/geolocation";
import { Location } from "types/geolocation";

const SearchResultCard = muiStyled(Card)(({ theme }) => ({ flexGrow: 1 }));

const SearchResult: React.FC = () => {
  return (
    <SearchResultCard raised>
      <SearchCardHeader title="搜尋結果" />
      <SearchCardContent>
        <SearchList>
          {mockBusRoutes.map((item, index) => (
            <SearchListItem key={item.RouteUID}>
              <BusIndexInfoCard busIndexData={item} />
            </SearchListItem>
          ))}
        </SearchList>
      </SearchCardContent>
    </SearchResultCard>
  );
};

const SearchCardContent = muiStyled(CardContent)(({ theme }) => ({
  padding: 0,
  [`&.${cardContentClasses.root}:last-child`]: {
    paddingBottom: 0,
  },
}));

const SearchList = muiStyled(List)(({ theme }) => ({
  height: 400,
  overflow: "auto",
  paddingLeft: 47,
  paddingRight: 47,
  "& ul": { padding: 0 },
}));

const SearchListItem = muiStyled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingTop: 16,
  "&:last-child": {
    paddingBottom: 16,
  },
}));

const SearchCardHeader = muiStyled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
}));

export default SearchResult;
