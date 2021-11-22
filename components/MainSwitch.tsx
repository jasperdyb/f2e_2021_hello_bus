import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import { styled as muiStyled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const IOSSwitch = muiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 110,
  height: 45,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(65px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.secondary.main,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 42,
    height: 42,
  },
  "& .MuiSwitch-track": {
    borderRadius: 100,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const MainSwitch: React.FC<SwitchProps> = ({ onChange }) => {
  return <IOSSwitch onChange={onChange}></IOSSwitch>;
};

export default MainSwitch;
