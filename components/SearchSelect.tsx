import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@mui/material/Button";

import Icon from "@mui/material/Icon";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

interface Props {
  value: number;
  selections: Array<{
    title: string;
    value: number;
  }>;
  onChange: (event: SelectChangeEvent<unknown>) => void;
}

const SearchSelect: React.FC<Props> = ({ value, selections, onChange }) => {
  return (
    <SearchPanelSelect
      labelId="region-label"
      value={value}
      onChange={onChange}
      MenuProps={{ MenuListProps: { sx: { backgroundColor: "#F6F6F6" } } }}
    >
      {selections.map((item: { title: string; value: number }, index) => (
        <SearchMenuItem key={index} value={item.value}>
          {item.title}
        </SearchMenuItem>
      ))}
    </SearchPanelSelect>
  );
};

export default SearchSelect;
