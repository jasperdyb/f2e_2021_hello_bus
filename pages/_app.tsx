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

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#E1AB43",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#A3C896",
    },
    info: {
      main: "#FFF",
      contrastText: "#000",
    },
  },

  shape: {
    borderRadius: 15,
  },

  typography: {
    // fontFamily:font-family: PingFangTC-Regular, sans-serif,
    fontFamily: [
      // "'Crimson Pro'",
      "PingFang TC",
      "'Noto Sans TC'",
      "Roboto",
      "sans-serif",
    ].join(","),
    fontSize: 14,

    h1: {
      fontSize: "24px",
    },
    h2: {
      fontSize: "18px",
    },
    h3: {
      fontSize: "16px",
    },
    subtitle1: {
      fontSize: "14px",
    },
    subtitle2: {
      fontSize: "12px",
    },
    body1: {
      fontSize: "16px",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "#FFF",
        },
      },
    },
  },
});

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
