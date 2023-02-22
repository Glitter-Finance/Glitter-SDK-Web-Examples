import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Item from "../Item";
import React from "react";
import {AccountCircle} from "@mui/icons-material";

function Bridge() {
  return (
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Bridge"/>
      <CardContent>
        <Grid container spacing={2} maxWidth="xl">
          <Grid item xs={6}>
            <Stack>
              <Item>
                <Typography>From Wallet</Typography>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src="/phantom.png" className="input-image"/>
                  <Typography>{"4iVQ242Ck7azm9bu8HapFt7qZzkW6bKVXb3cXhK6vfEj".slice(0, 20)}...</Typography>
                </Box>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src="/solana.png" className="input-image"/>
                  <Typography>SOLANA</Typography>
                </Box>
              </Item>
              <Item>
                <Typography>Source Token:</Typography>
              </Item>
              <Item>
                <Stack direction="row" spacing={2}>
                  <Item><Radio className="radio-item"/></Item>
                  <Item><img src="/solana.png" className="input-image"/></Item>
                  <Item><Typography>xAlgo</Typography></Item>
                  <Item><Typography>3045.0</Typography></Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Item><Radio className="radio-item"/></Item>
                  <Item><img src="/solana.png" className="input-image"/></Item>
                  <Item><Typography>xAlgo</Typography></Item>
                  <Item><Typography>3045.0</Typography></Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Item><Radio className="radio-item"/></Item>
                  <Item><img src="/solana.png" className="input-image"/></Item>
                  <Item><Typography>xAlgo</Typography></Item>
                  <Item><Typography>3045.0</Typography></Item>
                </Stack>
              </Item>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Item>
                <Typography>To Wallet</Typography>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src="/phantom.png" className="input-image"/>
                  <Typography>{"4iVQ242Ck7azm9bu8HapFt7qZzkW6bKVXb3cXhK6vfEj".slice(0, 20)}...</Typography>
                </Box>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src="/algorand.png" className="input-image"/>
                  <Typography>ALGORAND</Typography>
                </Box>
              </Item>
              <Item>
                <Typography>Destination Token:</Typography>
              </Item>
              <Item>
                <Stack direction="row" spacing={2}>
                  <Item><Radio className="radio-item"/></Item>
                  <Item><img src="/algorand.png" className="input-image"/></Item>
                  <Item><Typography>xAlgo</Typography></Item>
                  <Item><Typography>3045.0</Typography></Item>
                </Stack>
              </Item>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} maxWidth="xl">
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Item>
                <Button size="large" className="item-button">OPT-IN</Button>
              </Item>
              <Item>
                <Button size="large" className="item-button">SWAP</Button>
              </Item>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Bridge;
