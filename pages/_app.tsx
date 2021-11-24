import type { AppProps } from "next/app";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import { createGlobalStyle } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  styled,
  ThemeProvider,
  darken,
  Palette,
  PaletteOptions,
} from "@mui/material/styles";
import { SceneSpotContextProvider } from "context/sceneSpot";
import { GeolocationContextProvider } from "context/geolocation";
import { mainTheme } from "public/theme/main";

const GlobalStyle = createGlobalStyle`
html{ 
}

body{ 
  background-color: white;
}
`;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <ThemeProvider theme={mainTheme}>
        <GeolocationContextProvider>
          <SceneSpotContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </SceneSpotContextProvider>
        </GeolocationContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
