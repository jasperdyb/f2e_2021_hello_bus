import React, { useState, useEffect } from "react";
import Image from "next/image";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card, { cardClasses } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List, { listClasses } from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import SortSelect from "components/SortSelect";
import CyclingRouteInfoCard from "components/CyclingRouteInfoCard";
import SearchPagination from "components/SearchPagination";
import BusIndexInfoCard from "components/BusIndexInfoCard";

import { BusIndexDataType } from "types/bus";
import { mockBusRoutes } from "services/bus";

import { useFormContext } from "react-hook-form";
import { useGetBusRouteIndex } from "services/bus";

import signPic_default from "@img/signPic_default.png";
import signPic_wrong from "@img/signPic_wrong.png";
import { Typography } from "@mui/material";

const SearchResult: React.FC = () => {
  const router = useRouter();

  const { watch } = useFormContext();

  const keyword = watch("keyword");
  const city = watch("city");

  const searchBusRouteName = React.useMemo(
    () => `contains(RouteName/Zh_tw,'${keyword}')`,
    [keyword]
  );

  const { buses, isError, isLoading } = useGetBusRouteIndex(city, {
    $filter: searchBusRouteName,
  });

  React.useEffect(() => {
    console.log(city, keyword);
  }, [keyword, city]);

  return (
    <SearchResultCard raised>
      <SearchCardHeader title="搜尋結果" />
      <SearchResultContainer>
        {city ? (
          <>
            {!isError && !isLoading && (
              <>
                {buses && buses.length > 0 ? (
                  <SearchList>
                    {buses.map((item, index) => (
                      <SearchListItem
                        key={item.RouteUID}
                        onClick={() =>
                          router.push(
                            `/bus_status_detail/${city}?route=${item.RouteName.Zh_tw}`
                          )
                        }
                      >
                        <BusIndexInfoCard busIndexData={item} />
                      </SearchListItem>
                    ))}
                  </SearchList>
                ) : (
                  <div>
                    <Image
                      src={signPic_wrong}
                      alt="Search result default"
                      width={"420"}
                      height={"140"}
                      objectFit="contain"
                    />
                    <HintTypography>很抱歉，找不到符合的路線</HintTypography>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div>
            <Image
              src={signPic_default}
              alt="Search result default"
              width={"420"}
              height={"140"}
              objectFit="contain"
            />
            <HintTypography>尋找您的公車路線</HintTypography>
          </div>
        )}
      </SearchResultContainer>
    </SearchResultCard>
  );
};

const SearchResultCard = muiStyled(Card)(({ theme }) => ({
  [`&.${cardClasses.root}`]: {},
}));

const SearchList = muiStyled(List)(({ theme }) => ({
  [`&.${listClasses.root}`]: {
    padding: 0,
  },
}));

const SearchListItem = muiStyled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingTop: 16,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

const SearchCardHeader = muiStyled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
}));

const SearchResultContainer = muiStyled("div")(({ theme }) => ({
  minHeight: "30vh",
  maxHeight: "45vh",
  overflow: "scroll",
  paddingLeft: 47,
  paddingRight: 47,
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

const HintTypography = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));

export default SearchResult;
