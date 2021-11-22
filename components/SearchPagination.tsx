import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Image from "next/image";

import { useTheme } from "@mui/material/styles";

import Pagination from "@mui/material/Pagination";

const ThemedPagination = muiStyled(Pagination)(
  ({ theme }) => `
  & .MuiPaginationItem-root {
    border-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};
  }

  & .MuiPaginationItem-previousNext {
    border-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};
  }

  & .MuiPaginationItem-previousNext.Mui-disabled {
    border-color:${theme.palette.grey[700]};
    color: ${theme.palette.grey[700]};
    background-color: null;
  }

  & .Mui-selected {
    background-color:  ${theme.palette.secondary.main};
    color:  ${theme.palette.common.white};
    border: none;
  }
`
);

const CustomPagination = styled(ThemedPagination)`
  & .MuiPagination-ul {
    justify-content: flex-end;
  }

  & .MuiPagination-ul li {
    width: 74px;
  }

  & .MuiPaginationItem-sizeLarge {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
`;

interface Props {
  page: number;
  dataLength: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const SearchPagination: React.FC<Props> = ({ page, dataLength, onChange }) => {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    setCount(Math.ceil(dataLength / process.env.NUMBER_PER_PAGE));
  }, [dataLength]);

  return (
    <CustomPagination
      size="large"
      page={page}
      count={count}
      variant="outlined"
      onChange={onChange}
    />
  );
};
export default SearchPagination;
