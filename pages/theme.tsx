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

export default Theme;
