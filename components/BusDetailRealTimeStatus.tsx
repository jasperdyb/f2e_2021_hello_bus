import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip, { chipClasses } from "@mui/material/Chip";

import ButtonAnimatedBus from "components/ButtonAnimatedBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons/faExchangeAlt";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import { parsePointType } from "services/bus";
import { getDistanceBetween } from "services/geolocation";
import {
  StopType,
  BusN1EstimateTimeDataType,
  BusA1DataType,
  StopStatusEnum,
} from "types/bus";

import { gsap } from "gsap";

type Props = {
  stops?: Array<StopType>;
  stopEstimateTimes?: Array<BusN1EstimateTimeDataType>;
  Buses?: Array<BusA1DataType>;
  InitStop: BusN1EstimateTimeDataType;
  Direction: number;
  setDirection: (direction: number) => void;
  setZoomInStop: (stop: StopType) => void;
};

const BusDetailRealTimeStatus: React.FC<Props> = ({
  stops,
  stopEstimateTimes,
  Buses,
  InitStop,
  Direction,
  setDirection,
  setZoomInStop,
}) => {
  const router = useRouter();
  const stepperRef = React.useRef();

  useEffect(() => {
    if (InitStop?.StopID) {
      console.log("=== scrollTo ===", `Stop${InitStop.StopID}`);
      gsap.to(stepperRef.current, {
        duration: 2,
        scrollTo: `#Stop${InitStop.StopID}`,
      });
    }
  }, [InitStop]);

  return (
    <BusDetailRealTimeStatusContainer>
      <BusDetailRealTimeStatusHeader container>
        <Grid item sm={6}>
          <Stack height={"100%"}>
            <Typography typography={"subtitle1"} color={"grey.400"}>
              行駛方向
            </Typography>
            <Typography typography={"h2"}>
              <ColorText>往</ColorText>{" "}
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
          {stops &&
            stopEstimateTimes &&
            stops.map((stop, index) => {
              const EstimateTimeStatus = stopEstimateTimes.find(
                (se) => se.StopID === stop.StopID
              );
              const EstimateTimeMinute = EstimateTimeStatus
                ? Math.floor(EstimateTimeStatus.EstimateTime / 60)
                : -1;
              const nearStop = EstimateTimeMinute === 0;

              return (
                <Step id={`Stop${stop.StopID}`} key={index} active={nearStop}>
                  <BusStopStepLabel
                    onClick={() => {
                      setZoomInStop(stop);
                    }}
                  >
                    <Typography>
                      {EstimateTimeStatus &&
                      EstimateTimeStatus.StopStatus !== 0 ? (
                        StopStatusEnum[EstimateTimeStatus.StopStatus]
                      ) : (
                        <>
                          {nearStop ? (
                            <ColorText color="#F66A4B">即將進站 </ColorText>
                          ) : (
                            `${EstimateTimeMinute} 分`
                          )}
                        </>
                      )}{" "}
                      {stop.StopName.Zh_tw}
                    </Typography>
                    {EstimateTimeStatus?.PlateNumb && (
                      <BusChip
                        icon={<FontAwesomeIcon icon={faBus} width={16} />}
                        label={EstimateTimeStatus.PlateNumb}
                        color="secondary"
                        variant="outlined"
                      />
                    )}
                  </BusStopStepLabel>
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

const BusStopStepLabel = muiStyled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.label}`]: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
}));

const BusChip = muiStyled(Chip)(({ theme }) => ({
  paddingLeft: 8,
  [`& .${chipClasses.label}`]: {},
}));

export default BusDetailRealTimeStatus;
