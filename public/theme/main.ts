import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const colorSet = {
  primary: "#5A637E",
  secondary: "#5CBCDB",
  grey: "#B4B3B3",
  lightGrey: "#E5E5E5",
};

export const mainTheme = createTheme({
  spacing: 8, // default
  palette: {
    primary: {
      main: colorSet.primary,
    },
    secondary: {
      main: colorSet.secondary,
    },
    text: {
      primary: "#4C546A",
    },
  },

  shape: { borderRadius: 12 },

  typography: {
    // fontFamily:font-family: PingFangTC-Regular, sans-serif,
    fontSize: 16,
    fontFamily: [
      // "'Crimson Pro'",
      "PingFang TC",
      "'Noto Sans TC'",
      "Roboto",
      "sans-serif",
    ].join(","),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          // color: "black",
          borderRadius: 100,
          ":disabled": {
            color: "white",
          },
        },
        outlinedPrimary: {
          borderRadius: 100,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlinedSecondary: {
          borderColor: colorSet.secondary,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colorSet.lightGrey,
          borderWidth: 0,
          [":hover"]: {
            boxShadow: "0px 0px 0px 3px rgba(121, 142, 200, 0.49)",
          },
          [`:hover.${outlinedInputClasses.disabled}`]: {
            boxShadow: "none",
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            border: "1px solid #8B94B3",
          },
          [`&:focus .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "transparent",
          },
          [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: "transparent",
            },
          [`&.${outlinedInputClasses.disabled}`]: {
            backgroundColor: "#F1F1F1",
          },
          [`& .${outlinedInputClasses.input}`]: {
            padding: "9px 16px",
          },
        },
        notchedOutline: {
          borderColor: "transparent",
        },
      },
    },
  },
});
