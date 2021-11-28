import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";

import { styled as muiStyled, useTheme } from "@mui/material/styles";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import { ButtonBaseProps } from "@mui/material/ButtonBase";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends Omit<DialogProps, "open"> {
  ButtonComponent?: React.FC<ButtonBaseProps>;
  title?: string;
}

const MainDialog: React.FC<Props> = ({
  ButtonComponent,
  title,
  children,
  ...dialogProps
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {React.createElement(
        ButtonComponent || Button,
        {
          onClick: handleClickOpen,
        },
        "Open alert dialog"
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        {...dialogProps}
      >
        <DialogTitle id="alert-dialog-title">
          {handleClose ? (
            <CloseButtonIcon aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </CloseButtonIcon>
          ) : null}
          {title}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

const CloseButtonIcon = muiStyled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 33,
  top: 33,
  padding: 0,
}));

export default MainDialog;
