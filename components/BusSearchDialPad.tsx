import React, { useState, useEffect, createElement } from "react";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent, { cardContentClasses } from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons/faBackspace";

interface ColorButtonProps extends ButtonProps {
  buttonColor?: string;
  buttonTextColor?: string;
  buttonHoverColor?: string;
  buttonHoverTextColor?: string;
  borderColor?: string;
}

interface Props extends ColorButtonProps {
  label?: string | JSX.Element;
}

const buttons: Array<Props> = [
  {
    buttonColor: "#DE6868",
    buttonTextColor: "white",
    buttonHoverColor: "#EC7A7A",
    label: "紅",
    onClick: () => {},
  },
  {
    buttonColor: "#5274CD",
    buttonTextColor: "white",
    buttonHoverColor: "#6787DB",
    label: "藍",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "1",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "2",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "3",
    onClick: () => {},
  },
  {
    buttonColor: "#B29076",
    buttonTextColor: "white",
    buttonHoverColor: "#C9A58C",
    label: "棕",
    onClick: () => {},
  },
  {
    buttonColor: "#83C986",
    buttonTextColor: "white",
    buttonHoverColor: "#91D994",
    label: "綠",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "4",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "5",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "6",
    onClick: () => {},
  },
  {
    buttonColor: "#EDBE62",
    buttonTextColor: "white",
    buttonHoverColor: "#EDC984",
    label: "黃",
    onClick: () => {},
  },
  {
    buttonColor: "#E88C59",
    buttonTextColor: "white",
    buttonHoverColor: "#F2A478",
    label: "橘",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "7",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "8",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "9",
    onClick: () => {},
  },
  {
    buttonColor: "transparent",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#BCC3D9",
    borderColor: "#8B94B2",
    label: "F",
    onClick: () => {},
  },
  {
    buttonColor: "#B1B4BE",
    buttonTextColor: "white",
    buttonHoverColor: "#BCC1D1",
    label: "更多",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "C",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: "0",
    onClick: () => {},
  },
  {
    buttonColor: "#E5E5E5",
    buttonTextColor: "#4C546A",
    buttonHoverColor: "#DEDEDE",
    label: createElement(FontAwesomeIcon, { icon: faBackspace }),
    onClick: () => {},
  },
];

const BusSearchDialPad: React.FC = () => {
  return (
    <PadCard raised>
      <Grid
        container
        columns={5}
        rowSpacing={2}
        columnSpacing={1}
        alignItems={"center"}
      >
        {buttons.map((button, index) => (
          <Grid item xs={1} key={index}>
            <ColorButton
              buttonColor={button.buttonColor}
              buttonTextColor={button.buttonTextColor}
              onClick={button.onClick}
              borderColor={button.borderColor}
            >
              <Typography typography={"h2"}>{button.label}</Typography>
            </ColorButton>
          </Grid>
        ))}
      </Grid>
    </PadCard>
  );
};
const ColorButton = styled(Button)<ColorButtonProps>(
  ({
    theme,
    buttonColor,
    buttonTextColor,
    buttonHoverColor,
    borderColor,
    buttonHoverTextColor,
  }) => ({
    padding: "12px 8px",
    color: buttonTextColor,
    backgroundColor: buttonColor,
    // border: borderColor && `1px solid ${borderColor}`,
    border: borderColor ? "1px solid " + borderColor : undefined,
    "&:hover": {
      backgroundColor: buttonHoverColor,
      color: buttonHoverTextColor,
    },
  })
);
const PadCard = muiStyled(Card)(({ theme }) => ({
  paddingTop: 36,
  paddingBottom: 36,
  paddingLeft: 24,
  paddingRight: 16,
}));

export default BusSearchDialPad;
