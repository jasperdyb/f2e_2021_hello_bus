import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { switchClasses } from "@mui/material/Switch";

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

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 20,
          padding: 0,
          [`& .${switchClasses.switchBase}`]: {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            [`&.${switchClasses.checked}`]: {
              transform: "translateX(24px)",
              color: "#fff",
              [`& + .${switchClasses.track}`]: {
                opacity: 1,
                border: 0,
              },
              [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
                opacity: 0.5,
              },
            },
            [`&.Mui-focusVisible + .${switchClasses.thumb}`]: {
              // color: theme.palette.secondary.main,
              border: "6px solid #fff",
            },
            [`&.Mui-disabled + .${switchClasses.thumb}`]: {
              // color:
              //   theme.palette.mode === "light"
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[600],
            },
            [`&.Mui-disabled + .${switchClasses.track}`]: {
              // opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
          },
          [`& .${switchClasses.thumb}`]: {
            boxSizing: "border-box",
            width: 16,
            height: 16,
            boxShadow: "1px 0px 1px rgba(0, 0, 0, 0.25)",
          },
          [`& .${switchClasses.track}`]: {
            borderRadius: 100,
            // backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",

            backgroundColor: "#D8DAE0",
            opacity: 1,
            // transition: theme.transitions.create(["background-color"], {
            duration: 500,
            boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
});
