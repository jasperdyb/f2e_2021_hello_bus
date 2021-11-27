import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@mui/material/Button";

import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import slideMenuArrowSvg from "public/icon//slideMenuArrow.svg";

const SearchPanelSelect = styled(Select)`
  min-width: 270px;
  height: 50px;
  border-radius: 10px;

  & .MuiSelect-outlined {
    background-color: #ebebeb;
    color: #707070;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const SearchMenuItem = styled(MenuItem)`
  color: #707070;

  &.Mui-selected {
    background-color: #a6cde0;
    color: #ffffff;
    border-radius: 10px;
    margin: 0 5px;
  }
`;

interface Props extends SelectProps {
  selections: Array<{
    title: string;
    value: number;
  }>;
}

const SearchSelect: React.FC<Props> = (props) => {
  return (
    <Select
      labelId="region-label"
      {...props}
      // MenuProps={{ MenuListProps: { sx: { backgroundColor: "#F6F6F6" } } }}
    >
      {props.selections.map((item: { title: string; value: number }, index) => (
        <MenuItem key={index} value={item.value}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SearchSelect;
