import {Box, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import Item from "../Item";
import React from "react";
import {Metamask, Pera, Phantom, Solfare, Coin98} from "glitter-bridge-sdk-web-dev";
declare global {
  interface Window {
    coin98?: any;
  }
}
function Wallets() {

  const onMetamask = () => {
    const metamask = new Metamask();
    metamask.connect()
      .then((response: any) => {
        console.log(response);
        metamask.getProvider()
          .then((provider) => {
            console.log(provider);
          })
      })
  }

  const onPhantom = () => {
    const phantom = new Phantom("https://polygon-rpc.com");
    phantom.getProvider().then((response) => {
      console.log(response);
      phantom.connect()
        .then((response) => {
          console.log("Response", response)
        })
        .catch((err) => {
          console.log("Error", err)
        })
    })
  }

  const onSolfare = () => {
    const solfare = new Solfare("https://api.mainnet-beta.solana.com");
    solfare.connect()
      .then((response) => {
        console.log("Response", response)
      })
      .catch((err) => {
        console.log("Error", err)
      })
  }

  const onPera = async () => {
    try {
      const pera = new Pera();
      const response = await pera.connect();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  const onCoin98 = async () => {
    window.coin98.connect(1)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return(
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Connect Wallets"/>
      <CardContent>
        <Stack>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                <Link onClick={() => { onPhantom() }}>Phantom</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/solflare.png" className="input-image"/>
              <Typography>
                <Link onClick={() => { onSolfare() }}>Solfare</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                <Link onClick={() => { onMetamask() }}>Metamask</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                <Link onClick={() => { onPera() }}>Pera</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                <Link onClick={() => { onCoin98() }}>Coin98</Link>
              </Typography>
            </Box>
          </Item>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Wallets;
