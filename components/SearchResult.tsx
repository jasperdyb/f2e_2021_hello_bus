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
import CardHeader from "@mui/material/CardHeader";
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

const SearchContainer = muiStyled(CardContent)(({ theme }) => ({}));

const SearchCardHeader = muiStyled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const SearchResultCard = muiStyled(Card)(({ theme }) => ({ flexGrow: 1 }));

const SearchResult: React.FC = () => {
  return (
    <SearchResultCard raised>
      <SearchCardHeader title="搜尋結果" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </SearchResultCard>
  );
};

export default SearchResult;
