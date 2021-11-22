import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const InfoGridContainer = styled(Stack)`
  background-color: white;
`;

const ThemedButton = muiStyled(Button)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.primary.contrastText,
  padding: "13px 20px",
  borderRadius: "100px",
  "& .MuiButton-endIcon": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    ".MuiButton-endIcon": {
      color: theme.palette.common.white,
    },
  },
}));

interface Props {
  title: string;
  link?: string;
}

const MainButton: React.FC<Props> = ({ title, link }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemedButton variant="outlined" endIcon={<ArrowForwardIcon />}>
      <Typography typography={onMobile ? "h1" : "h2"}>{title}</Typography>
    </ThemedButton>
  );
};

export default MainButton;
