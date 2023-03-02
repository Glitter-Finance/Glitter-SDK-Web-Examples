import {Box, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import Item from "../Item";
import React from "react";
import {Chains, Wallets as GlitterWallets} from "glitter-bridge-sdk-web-dev";
declare global {
  interface Window {
    coin98?: any;
  }
}
function Wallets() {

  const onMetamask = async () => {
    try {
      const metamask = new GlitterWallets.networks[Chains.ETHEREUM].metamask();
      const addressResponse = await metamask.connect()
      const provider = await metamask.getProvider()
      console.log(addressResponse, provider, Chains.ETHEREUM);

      const switchChainResponse = await metamask.switchChain("0x38")
      console.log(switchChainResponse);
    } catch (e) {
      console.log(3);
    }
  }

  const onPhantom = () => {
    const phantom = new GlitterWallets.networks[Chains.SOLANA].phantom("https://polygon-rpc.com");
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
    const solfare = new GlitterWallets.networks[Chains.SOLANA].solfare("https://polygon-rpc.com");
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
      const pera = new GlitterWallets.networks[Chains.ALGO].pera();
      const response = await pera.connect();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  const onCoin98 = async () => {
    const coin98 = new GlitterWallets.networks[Chains.SOLANA].coin98();
    const response = await coin98.connect(101);
    console.log(response);
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
