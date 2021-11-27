import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import Autocomplete, {
  AutocompleteProps,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface Props
  extends AutocompleteProps<
    { title: string },
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  > {
  rotateIndicatorOnOpen?: boolean;
}
const CustomAutoComplete = muiStyled((props: Props) => (
  <Autocomplete {...props} />
))(({ theme, rotateIndicatorOnOpen }) => ({
  [`& .${autocompleteClasses.popupIndicatorOpen}`]: {
    transform: !rotateIndicatorOnOpen && "unset",
  },
}));

const SearchAutoComplete: React.FC<Props> = (props) => {
  return (
    <CustomAutoComplete
      disablePortal
      renderInput={(params) => (
        <TextField {...params} placeholder="關鍵字查詢" />
      )}
      rotateIndicatorOnOpen={true}
      {...props}
    />
  );
};

export default SearchAutoComplete;
