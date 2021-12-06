import React, { createContext, useContext, useState, useEffect } from "react";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CityOptions } from "types/bus";

type BusSearchFormType = {
  city: string;
  keyword: string;
};

export const BusSearchFormContextProvider: React.FC = (props) => {
  const methods = useForm<BusSearchFormType>({
    defaultValues: {
      city: "",
      keyword: "",
    },
  });

  return (
    // this is the provider providing state
    <FormProvider {...methods}>{props.children} </FormProvider>
  );
};
