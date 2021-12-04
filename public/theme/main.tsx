import { styled, createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { switchClasses } from "@mui/material/Switch";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { stepLabelClasses } from "@mui/material/StepLabel";

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
      contrastText: "#FFF",
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
    h1: {
      fontSize: 26,
    },
    h2: {
      fontSize: 20,
    },
    subtitle1: {
      fontSize: 12,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // scrollbarColor: `${colorSet.primary} transparent`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "0.4em",
            // backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: colorSet.primary,
            minHeight: 40,
            // border: "3px solid #2b2b2b",
          },

          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              // backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              // backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              // backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            // backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          // color: "black",
          borderRadius: 10,
          ":disabled": {
            color: "white",
          },
        },
        outlinedPrimary: {
          borderRadius: 10,
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
            [`&.${outlinedInputClasses.disabled}`]: {
              boxShadow: "none",
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #8B94B3",
            },
          },
          [":focus"]: {
            boxShadow: "0px 0px 0px 3px rgba(121, 142, 200, 0.49)",
            [`&.${outlinedInputClasses.disabled}`]: {
              boxShadow: "none",
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #8B94B3",
            },
          },
          [":active"]: {
            boxShadow: "0px 0px 0px 3px rgba(121, 142, 200, 0.49)",
            [`&.${outlinedInputClasses.disabled}`]: {
              boxShadow: "none",
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #8B94B3",
            },
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
            [`&.${switchClasses.disabled} + .${switchClasses.thumb}`]: {
              // color: theme.palette.secondary.main,
              border: "6px solid #fff",
            },
            [`&.${switchClasses.disabled} + .${switchClasses.thumb}`]: {
              // color:
              //   theme.palette.mode === "light"
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[600],
            },
            [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
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
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: "#4C546A",
        },
        root: {
          [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.lineVertical}`]: {
              borderColor: "#F66A4B",
            },
          },
          marginLeft: 8,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {},
      },
    },
    MuiStepLabel: {
      defaultProps: {
        StepIconComponent: (props) => <StepIconComponent {...props} />,
      },
      styleOverrides: {
        root: {
          // [`& .${stepLabelClasses.label}.${stepLabelClasses.active}`]: {
          //   color: "#F66A4B",
          // },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& .${autocompleteClasses.inputRoot}`]: {
            [`& .${autocompleteClasses.input}`]: { padding: 0 },
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          textAlign: "center",
          minHeight: 60,
          paddingTop: 30,
          paddingBottom: 30,
        },
      },
    },
  },
});

const StepIconComponent = styled("div")<{ active?: boolean }>(
  ({ theme, active }) => ({
    width: 17,
    height: 17,
    paddingRight: 0,
    borderRadius: 100,
    borderColor: active ? "#F66A4B" : "#4C546A",
    borderWidth: 5,
    borderStyle: "solid",
    backgroundColor: "#FFF",
  })
);
