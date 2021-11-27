import React from "react";
import styled from "styled-components";
import { styled as muiStyled, useTheme } from "@mui/material/styles";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { menu } from "components/Navbar";

const CustomBreadcrumbs = styled(Breadcrumbs)`
  padding: 16px 0;
`;

const NavBreadCrumbs: React.FC = () => {
  const router = useRouter();
  return (
    <CustomBreadcrumbs
      aria-label="breadcrumb"
      separator={<ThemedNavigateNextIcon fontSize="small" />}
    >
      <Link underline="hover" color="inherit" href="/">
        <Typography color={"primary.contrastText"}>首頁</Typography>
      </Link>
      <Typography color={"primary.contrastText"}>
        {menu.find((i) => i.link === router.route).title}
      </Typography>
    </CustomBreadcrumbs>
  );
};

const ThemedNavigateNextIcon = muiStyled(NavigateNextIcon)(({ theme }) => ({
  color: theme.palette.common.white,
}));
export default NavBreadCrumbs;
