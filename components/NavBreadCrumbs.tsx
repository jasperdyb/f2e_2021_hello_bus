import React from "react";
import styled from "styled-components";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";

const CustomBreadcrumbs = styled(Breadcrumbs)`
  padding: 16px 0;
`;

const NavBreadCrumbs: React.FC = () => {
  return (
    <CustomBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Link underline="hover" color="inherit" href="/">
        首頁
      </Link>
      <Typography color="secondary.main">探索路線</Typography>
    </CustomBreadcrumbs>
  );
};
export default NavBreadCrumbs;
