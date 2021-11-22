import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";

import MainSwitch from "components/MainSwitch";

import { useGeolocationContext } from "context/geolocation";
import { getGeocoding, getGeocodingReverse } from "services/geolocation";
interface SearchFormType {
  search: string;
  address: string;
}

const SearchPanel: React.FC = () => {
  const {
    autoAddress,
    setAutoAddress,
    setLocation,
    address,
    setAddress,
    setSearchKey,
    applySearch,
    resetSearch,
  } = useGeolocationContext();

  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    control,
    formState,
  } = useForm<SearchFormType>({
    defaultValues: {
      search: "",
      address: "",
    },
  });

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, []);

  useEffect(() => {
    if (autoAddress && address) {
      const currentValues = getValues();
      reset({
        ...currentValues,
        address,
      });
    }
  }, [autoAddress, address]);

  const onSubmit: SubmitHandler<SearchFormType> = async (data) => {
    console.log(data);
    console.log(formState.dirtyFields);
    setSearchKey(data.search);
    if (autoAddress && !formState.dirtyFields.address) {
      applySearch();
    } else {
      applySearch(data.address);
    }
  };

  return (
    <Card raised>
      <SearchContainer>
        <Grid container justifyContent={"space-between"}>
          <TitleGrid>
            <Stack spacing={"46px"}>
              <TitleStack spacing={"8px"}>
                <Typography typography={"h1"} color={"primary"}>
                  探索路線
                </Typography>
                <Typography>找到離您最近的自行車車道</Typography>
              </TitleStack>
              <SwitchStack direction={"row"} alignItems={"center"}>
                <SwitchLabel
                  control={
                    <MainSwitch
                      onChange={(_, checked) => setAutoAddress(checked)}
                    />
                  }
                  labelPlacement="start"
                  label="開啟自動定位"
                />
              </SwitchStack>
            </Stack>
          </TitleGrid>
          <Grid>
            <Stack height={"100%"} justifyContent={"space-between"}>
              <Controller
                name="search"
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <SearchInputLabel
                    control={
                      <SearchInput
                        placeholder="請輸入關鍵字"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                      />
                    }
                    labelPlacement="start"
                    label="路線關鍵字"
                  />
                )}
              />{" "}
              <Controller
                name="address"
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <SearchInputLabel
                    control={
                      <SearchInput
                        placeholder="請輸入地址"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                      />
                    }
                    labelPlacement="start"
                    label="手動輸入地址"
                  />
                )}
              />
            </Stack>
          </Grid>
          <Stack justifyContent={"flex-end"}>
            <SearchButton
              disableElevation
              variant="contained"
              color="secondary"
              onClick={handleSubmit(onSubmit)}
            >
              GO !
            </SearchButton>
          </Stack>
        </Grid>
      </SearchContainer>
    </Card>
  );
};

const SearchContainer = styled(CardContent)`
  padding: 24px 48px 32px 32px;
  &:last-child {
    padding-bottom: 32px;
  }
`;

const ThemedStack = muiStyled(Stack)(
  ({ theme }) => ` border-left: 3px solid ${theme.palette.primary.main};
 
`
);

const TitleGrid = styled(Grid)`
  padding-right: 47px;
`;

const TitleStack = styled(ThemedStack)`
  padding-left: 16px;
`;

const SwitchStack = styled(Stack)``;

const SwitchLabel = styled(FormControlLabel)`
  margin-left: 16px;
  & .MuiFormControlLabel-label {
    margin-right: 48px;
  }
`;

const SearchInputLabel = styled(FormControlLabel)`
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 0;

  & .MuiFormControlLabel-label {
    margin-right: 64px;
  }
`;

const SearchInput = styled(TextField)`
  & .MuiOutlinedInput-input {
    width: 320px;
    padding: 12px;
  }
`;

const SearchButton = styled(Button)`
  min-width: 120px;
  height: 40px;
`;

export default SearchPanel;
