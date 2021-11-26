import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import { gsap } from "gsap";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ButtonBase, { buttonBaseClasses } from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  link?: string;
}

const ButtonAnimatedBus: React.FC<Props> = ({ title, link }) => {
  const [IsHovering, setIsHovering] = useState(false);
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const circleRightRef = useRef();
  const circleLeftRef = useRef();

  useEffect(() => {
    if (IsHovering) {
      gsap.to(circleRightRef.current, { right: -36 });
      gsap.to(circleLeftRef.current, { left: -18 });
    } else {
      gsap.to(circleRightRef.current, { right: -100 });
      gsap.to(circleLeftRef.current, { left: -100 });
    }
  }, [IsHovering]);

  return (
    <ThemedButton
      onMouseEnter={() => {
        console.log("onMouseOver");
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        console.log("onMouseLeave");
        setIsHovering(false);
      }}
    >
      <BusIcon />
      <CircleRight ref={circleRightRef} />
      <CircleLeft ref={circleLeftRef} />
    </ThemedButton>
  );
};

const ThemedButton = muiStyled(ButtonBase)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#5CBCDB",
  width: 100,
  height: 100,
  borderRadius: "50%",
  overflow: "hidden",

  // [`& .${buttonBaseClasses.root}`]: {},
}));

const TransparentCircle = muiStyled("div")(({ theme }) => ({
  position: "absolute",
  width: 100,
  height: 100,
  borderRadius: "50%",
  opacity: 0.3,
  // [`& .${buttonBaseClasses.root}`]: {},
}));
const CircleRight = muiStyled(TransparentCircle)(({ theme }) => ({
  right: -100,
  backgroundColor: "#B4E0EE",
}));
const CircleLeft = muiStyled(TransparentCircle)(({ theme }) => ({
  left: -100,
  top: 12,
  backgroundColor: "#316E82",
}));

const BusIcon = muiStyled((props: FontAwesomeIconProps) => (
  <FontAwesomeIcon icon={faBus} {...props} />
))(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.common.white,
  zIndex: 10,
}));

export default ButtonAnimatedBus;
