import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";

import ButtonAnimatedBus from "components/ButtonAnimatedBus";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons/faExchangeAlt";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import { testStops, testBusStop } from "services/bus";

const stops = testStops[0].Stops;
const busNearStop = testBusStop[0];

const SearchResultCard = muiStyled(Card)(({ theme }) => ({ flexGrow: 1 }));

const BusDetailRealTimeStatus: React.FC = () => {
  const router = useRouter();
  return (
    <BusDetailRealTimeStatusContainer>
      <BusDetailRealTimeStatusHeader container>
        <Grid item sm={6}>
          <Stack height={"100%"}>
            <Typography typography={"subtitle1"} color={"grey.400"}>
              行駛方向
            </Typography>
            <Typography typography={"h2"}>
              <ColorText>往</ColorText> 板橋前站
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          container
          sm={6}
          justifyContent={"flex-end"}
          paddingRight={1}
        >
          <ButtonAnimatedBus size={44} icon={faExchangeAlt}></ButtonAnimatedBus>
        </Grid>
      </BusDetailRealTimeStatusHeader>
      <BusDetailRealTimeStatusBody>
        <Stepper orientation="vertical">
          {stops.map((stop, index) => {
            const nearStop = stop.StopSequence === busNearStop.StopSequence;

            return (
              <Step key={stop.StationID} active={nearStop}>
                <StepLabel>
                  {nearStop && <ColorText color="#F66A4B">即將進站</ColorText>}{" "}
                  {stop.StopName.Zh_tw}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </BusDetailRealTimeStatusBody>
    </BusDetailRealTimeStatusContainer>
  );
};

const BusDetailRealTimeStatusHeader = muiStyled(Grid)(({ theme }) => ({
  width: "100%",
  paddingBottom: 14,
  paddingTop: 14,
}));

const ColorText = muiStyled("span")<{ color?: string }>(({ theme, color }) => ({
  color: color || theme.palette.secondary.main,
}));

const BusDetailRealTimeStatusContainer = muiStyled(Stack)(({ theme }) => ({
  width: 414,
  // height: 470,
}));

const BusDetailRealTimeStatusBody = muiStyled(Grid)(({ theme }) => ({
  width: "100%",
  overflow: "auto",
}));

const steps = [
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
];

export default BusDetailRealTimeStatus;
