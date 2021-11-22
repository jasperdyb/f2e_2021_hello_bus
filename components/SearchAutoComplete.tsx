import React from "react";
import styled from "styled-components";
// import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const CustomAutoComplete = styled(Autocomplete)`
  & .MuiAutocomplete-popupIndicatorOpen {
    transform: unset;
  }

  & .MuiAutocomplete-popupIndicator {
    color: #7baebe;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const SearchAutoComplete: React.FC = () => {
  return (
    <Card raised>
      <CustomAutoComplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="關鍵字查詢" />
        )}
        popupIcon={<SearchIcon />}
      />
    </Card>
  );
};

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
export default SearchAutoComplete;
