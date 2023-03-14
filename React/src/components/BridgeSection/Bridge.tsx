import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Radio,
  Stack,
  Typography
} from "@mui/material";
import Item from "../Item";
import React, {useState} from "react";
import {useSelectors} from "../store/selectors";
import {AlgorandBridge, SolanaBridge} from "glitter-bridge-sdk-web-dev";
import {RPC_URL} from "../store/type";

function Bridge() {
  const [optIn, setOptIn] = useState<boolean>(true);
  const [sourceTokenSymbol, setSourceTokenSymbol] = useState<string>("");
  const [destinationTokenSymbol, setDestinationTokenSymbol] = useState<string>("");
  const [sourceTokenAmount, setSourceTokenAmount] = useState<number>(0);
  const {wallet} = useSelectors();

  const checkForOptIn = async (tokenSymbol: string) => {
    const bridge = wallet.destinationNetworkName === "solana" ? new SolanaBridge(RPC_URL) : new AlgorandBridge();
    const exists = await bridge.optInAccountExists(wallet.destinationWalletAddress as string, tokenSymbol);
    setOptIn(!exists);
    console.log(exists);
  }

  const optInBtn = async () => {
    if (wallet.destinationNetworkName === "solana") {
      const bridge = new SolanaBridge(RPC_URL);
      const optInTransaction = await bridge.optIn(wallet.destinationWalletAddress as string, destinationTokenSymbol);
      await wallet.destinationWalletProvider.signAndSendTransaction(optInTransaction);
    } else if (wallet.destinationNetworkName === "algorand") {
      const bridge = new AlgorandBridge();
      const optInTransaction = await bridge.optIn(wallet.destinationNetworkName, destinationTokenSymbol);
      const signedTransaction = await wallet.destinationWalletProvider.signTransaction([optInTransaction]);
      const transactionResponse = await bridge.sendSignTransaction(signedTransaction);
      console.log(transactionResponse);
    }
  }

  const bridge = async () => {
    if (wallet.sourceNetworkName === "solana") {
      const bridge = new SolanaBridge(RPC_URL);
      console.log(wallet.sourceWalletAddress as string, sourceTokenSymbol, wallet.destinationNetworkName, wallet.destinationWalletAddress as string, destinationTokenSymbol, sourceTokenAmount);
      const bridgeTransaction = await bridge.bridge(wallet.sourceWalletAddress as string, sourceTokenSymbol, wallet.destinationNetworkName as string, wallet.destinationWalletAddress as string, destinationTokenSymbol, 5);
      await wallet.sourceWalletProvider.signAndSendTransaction(bridgeTransaction);
    } else if (wallet.sourceNetworkName === "algorand") {
      const bridge = new AlgorandBridge();
      console.log(wallet.sourceWalletAddress as string, sourceTokenSymbol, wallet.destinationNetworkName, wallet.destinationWalletAddress as string, destinationTokenSymbol, sourceTokenAmount);
      const bridgeTransaction = await bridge.bridge(wallet.sourceWalletAddress as string, sourceTokenSymbol, wallet.destinationNetworkName as string, wallet.destinationWalletAddress as string, destinationTokenSymbol, 5);
      console.log('BT', bridgeTransaction);
      const signedTransaction = await wallet.sourceWalletProvider.signTransaction([bridgeTransaction]);
      const transactionResponse = await bridge.sendSignTransaction(signedTransaction);
      console.log(transactionResponse);
    }
  }

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
                  <img src={`/${wallet.sourceWalletName}.png`} className="input-image" alt="broken"/>
                  <Typography>{wallet.sourceWalletAddress?.slice(0, 20)}...</Typography>
                </Box>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src={`/${wallet.sourceNetworkName}.png`} className="input-image" alt="broken"/>
                  <Typography>{wallet.sourceNetworkName?.toUpperCase()}</Typography>
                </Box>
              </Item>
              <Item>
                <Typography>Source Token:</Typography>
              </Item>
              <Item>
                {
                  wallet.sourceTokens?.map((token) => {
                    return (
                      token.balance && token.balance > 0 ?
                        <Stack direction="row" spacing={2} onClick={() => {
                          setSourceTokenSymbol(token.token);
                          setSourceTokenAmount(token.balance as number);
                        }}>
                          <Item><Radio className="radio-item"/></Item>
                          <Item><img src="/solana.png" className="input-image" alt="broken"/></Item>
                          <Item><Typography>{token.token}</Typography></Item>
                          <Item><Typography>{token.balance}</Typography></Item>
                        </Stack>
                        : <></>
                    )
                  })
                }
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
                  <img src={`/${wallet.destinationWalletName}.png`} className="input-image" alt="broken"/>
                  <Typography>{wallet.destinationWalletAddress?.slice(0, 20)}...</Typography>
                </Box>
              </Item>
              <Item>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}} className="bridge-box">
                  <img src={`/${wallet.destinationNetworkName}.png`} className="input-image" alt="broken"/>
                  <Typography>{wallet.destinationNetworkName?.toUpperCase()}</Typography>
                </Box>
              </Item>
              <Item>
                <Typography>Destination Token:</Typography>
              </Item>
              <Item>
                {
                  wallet.destinationTokens?.map((token) => {
                    return (
                      // token.balance && token.balance > 0 ?
                      <Stack direction="row" spacing={2} onClick={() => {
                        checkForOptIn(token.token);
                        setDestinationTokenSymbol(token.token)
                      }}>
                        <Item><Radio className="radio-item"/></Item>
                        <Item><img src="/solana.png" className="input-image" alt="broken"/></Item>
                        <Item><Typography>{token.token}</Typography></Item>
                        <Item><Typography>{token.balance}</Typography></Item>
                      </Stack>
                      // : <></>
                    )
                  })
                }
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
                {
                  optIn ?
                    <Item>
                      <Button size="large" className="item-button" onClick={() => {
                        optInBtn()
                      }}>OPT-IN</Button>
                    </Item>
                    :
                    <></>
                }
                <Button size="large" className="item-button" onClick={() => {
                  bridge()
                }}>SWAP</Button>
              </Item>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Bridge;
