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

import { testStops, testBusStop, findNearestStop } from "services/bus";
import { BusN1EstimateTimeDataType, StopStatusEnum } from "types/bus";

import { gsap } from "gsap";

const stops = testStops[0].Stops;
const busNearStop = testBusStop[0];

const SearchResultCard = muiStyled(Card)(({ theme }) => ({ flexGrow: 1 }));

type Props = {
  stops?: Array<BusN1EstimateTimeDataType>;
  Direction: number;
  setDirection: (direction: number) => void;
};

const BusDetailRealTimeStatus: React.FC<Props> = ({
  stops,
  Direction,
  setDirection,
}) => {
  const router = useRouter();
  const stepperRef = React.useRef();

  useEffect(() => {
    if (stops) {
      const nearestStop: BusN1EstimateTimeDataType = findNearestStop(stops);

      if (nearestStop) {
        gsap.to(stepperRef.current, {
          duration: 2,
          scrollTo: nearestStop.StopID,
        });
      }
    }
  }, [stops]);

  return (
    <BusDetailRealTimeStatusContainer>
      <BusDetailRealTimeStatusHeader container>
        <Grid item sm={6}>
          <Stack height={"100%"}>
            <Typography typography={"subtitle1"} color={"grey.400"}>
              行駛方向
            </Typography>
            <Typography typography={"h2"}>
              <ColorText>往</ColorText>
              {stops.length && stops[stops.length - 1].StopName.Zh_tw}
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
          <ButtonAnimatedBus
            size={44}
            icon={faExchangeAlt}
            onClick={() => setDirection(!Direction ? 1 : 0)}
          ></ButtonAnimatedBus>
        </Grid>
      </BusDetailRealTimeStatusHeader>
      <BusDetailRealTimeStatusBody ref={stepperRef}>
        <Stepper orientation="vertical">
          {stops.map((stop, index) => {
            const EstimateTimeMinute = Math.floor(stop.EstimateTime / 60);
            const nearStop = EstimateTimeMinute === 0;

            return (
              <Step id={stop.StopID} key={stop.StopID} active={nearStop}>
                <StepLabel>
                  {stop.StopStatus !== 0 ? (
                    StopStatusEnum[stop.StopStatus]
                  ) : (
                    <>
                      {nearStop ? (
                        <ColorText color="#F66A4B">即將進站</ColorText>
                      ) : (
                        `${EstimateTimeMinute} 分`
                      )}
                    </>
                  )}{" "}
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
  overflow: "scroll",
}));

export default BusDetailRealTimeStatus;
