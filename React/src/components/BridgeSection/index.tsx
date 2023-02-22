import {Container, Grid, Stack} from "@mui/material";
import React from "react";
import Wallets from "./Wallets";
import Bridge from "./Bridge";

function BridgeSection() {

  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <div className="bridge-section">
          <Grid container spacing={2} maxWidth="xl">
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <Wallets/>
            </Grid>
            <Grid item xs={5}>
              <Bridge/>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
}

export default BridgeSection;