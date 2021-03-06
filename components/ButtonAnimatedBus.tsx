import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import { gsap } from "gsap";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface Props extends ButtonBaseProps {
  icon: FontAwesomeIconProps["icon"];
  size?: number;
}

interface ButtonProps extends ButtonBaseProps {
  size?: number;
}

interface IconProps extends FontAwesomeIconProps {
  buttonSize?: number;
}

const ButtonAnimatedBus: React.FC<Props> = ({ onClick, icon, size }) => {
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
      size={size}
      onClick={onClick}
      onMouseEnter={() => {
        console.log("onMouseOver");
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        console.log("onMouseLeave");
        setIsHovering(false);
      }}
    >
      <ButtonIcon icon={icon} buttonSize={size} />
      <CircleRight ref={circleRightRef} />
      <CircleLeft ref={circleLeftRef} />
    </ThemedButton>
  );
};

const ThemedButton = muiStyled(ButtonBase)<ButtonProps>(
  ({ theme, size = 100 }) => ({
    position: "relative",
    backgroundColor: "#5CBCDB",
    width: size,
    height: size,
    borderRadius: "50%",
    overflow: "hidden",

    // [`& .${buttonBaseClasses.root}`]: {},
  })
);

const TransparentCircle = muiStyled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  opacity: 0.3,
  // [`& .${buttonBaseClasses.root}`]: {},
}));
const CircleRight = muiStyled(TransparentCircle)(({ theme }) => ({
  right: "-100%",
  backgroundColor: "#B4E0EE",
}));
const CircleLeft = muiStyled(TransparentCircle)(({ theme }) => ({
  left: "-100%",
  top: 12,
  backgroundColor: "#316E82",
}));

const ButtonIcon = muiStyled(FontAwesomeIcon)<IconProps>(
  ({ theme, buttonSize = 100 }) => ({
    fontSize: buttonSize * 0.6,
    color: theme.palette.common.white,
    zIndex: 10,
  })
);

export default ButtonAnimatedBus;
