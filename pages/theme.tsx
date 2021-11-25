import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const Theme: NextPage = () => {
  const items = [
    {
      type: "Button",
      components: [
        () => <Button variant="text">Text</Button>,
        () => <Button variant="contained">Contained</Button>,
        () => <Button variant="outlined">Outlined</Button>,
        () => (
          <Button variant="contained" disabled>
            Disabled
          </Button>
        ),
      ],
    },
    {
      type: "Chip",
      components: [
        () => <Chip color="secondary" label="Chip Filled" />,
        () => (
          <Chip color="secondary" label="Chip Outlined" variant="outlined" />
        ),
      ],
    },
    {
      type: "TextField",
      components: [
        () => <TextField placeholder="placeholder" variant="outlined" />,
        () => (
          <TextField placeholder="placeholder" variant="outlined" disabled />
        ),
      ],
    },
    {
      type: "Select",
      components: [
        () => (
          <Select labelId="demo-simple-select-label">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        ),
      ],
    },
    {
      type: "Switch",
      components: [() => <Switch color="secondary" />],
    },
    {
      type: "List",
      components: [
        () => (
          <List>
            <ListItem>
              <ListItemText primary="Simple" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        ),
      ],
    },

    {
      type: "Stepper",
      components: [
        () => (
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} active={index % 2 == 0}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        ),
      ],
    },
  ];

  return (
    <Container>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", padding: 8 }}>
        <Typography>Theme Components Preview</Typography>
        {items.map(({ type, components }, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{type}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {components.map((component, index) => (
                  <Grid key={index} item>
                    {component()}
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

const steps = [
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
];

export default Theme;
