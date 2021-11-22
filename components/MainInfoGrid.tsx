import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const InfoGridContainer = styled(Grid)`
  background-color: white;
`;

const ThemedGrid = muiStyled(Grid)(({ theme }) => ({
  borderColor: theme.palette.divider,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.primary.contrastText,
}));

const InfoTitleGrid = muiStyled(ThemedGrid)(({ theme }) => ({
  color: theme.palette.primary.main,
  maxWidth: 252,
  padding: "219px 0",
  textAlign: "center",
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "44px 0",
  },
}));

const InfoMainGrid = styled(ThemedGrid)`
  /* flex-grow: 2; */
  border-width: 1px;
  border-style: solid;
`;
const InfoSubGrid = styled(ThemedGrid)`
  /* flex-grow: 1; */
  border-width: 1px;
  border-style: solid;
`;

interface Props {
  title: string;
  link?: string;
  mainInfoElement?: JSX.Element;
  subInfoElement?: JSX.Element;
}

const MainInfoGrid: React.FC<Props> = ({
  title,
  link,
  mainInfoElement,
  subInfoElement,
}) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <InfoGridContainer container direction={onMobile ? "column" : "row"}>
      <Link href={link} passHref>
        <InfoTitleGrid item sm={2}>
          <Typography typography={"h1"}>{title}</Typography>
        </InfoTitleGrid>
      </Link>
      <InfoMainGrid item sm={7}>
        {mainInfoElement}
      </InfoMainGrid>
      <InfoSubGrid item sm={3}>
        {subInfoElement}
      </InfoSubGrid>
    </InfoGridContainer>
  );
};

export default MainInfoGrid;
