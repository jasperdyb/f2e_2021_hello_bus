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

type Props = {
  color?: string;
};

const NavBreadCrumbs: React.FC<Props> = ({ color }) => {
  const router = useRouter();
  return (
    <CustomBreadcrumbs
      aria-label="breadcrumb"
      color="primary"
      separator={<ThemedNavigateNextIcon fontSize="small" color="inherit" />}
    >
      <Link underline="hover" href="/">
        <Typography>首頁</Typography>
      </Link>
      <Typography>
        {/* {menu.find((i) => i.link === router.route).title} */}
        {router.route}
      </Typography>
    </CustomBreadcrumbs>
  );
};

const ThemedNavigateNextIcon = muiStyled(NavigateNextIcon)(({ theme }) => ({
  color: theme.palette.common.white,
}));
export default NavBreadCrumbs;
