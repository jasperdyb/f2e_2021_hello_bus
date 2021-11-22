import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";

import { SceneTypeOptions } from "types/sceneSpots";

const CustomDiv = styled("div")``;

interface Props {
  options: Array<{
    value: String | null;
    label: String;
  }>;
  value: String;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const SearchPanelTypeList: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default SearchPanelTypeList;
