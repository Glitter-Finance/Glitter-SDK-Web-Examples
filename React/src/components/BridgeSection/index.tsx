import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Radio,
  Stack,
  Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import Item from "../Item";
import { Wallets as GlitterWallets, Chains, SolanaBridge, AlgorandBridge } from "glitter-bridge-sdk-web-dev";
import Wallets from "./Wallets";
import Bridge from "./Bridge";

function BridgeSection() {
  const [sourceWalletProvider, setSourceWalletProvider] = useState();
  const [sourceWallet, setSourceWallet] = useState("");
  const [destinationWallet, setDestinationWallet] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceNetwork, setSourceNetwork] = useState("");
  const [destinationNetwork, setDestinationNetwork] = useState("");

  const [sourceTokens, setSourceTokens] = useState<[{ symbol: string, balance: number }]>();
  const [destinationTokens, setDestinationTokens] = useState<[{ symbol: string, balance: number }]>();

  const [solanaBridgeObj, setSolanaBridgeObj] = useState<SolanaBridge>();
  const [algorandBridgeObj, setAlgorandBridgeObj] = useState<AlgorandBridge>();

  const [optInBtnExists, setOptInBtnExists] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");

  useEffect(() => {
    const solanaObj = new SolanaBridge("https://neat-solitary-darkness.solana-mainnet.quiknode.pro/ceec00cc12c1b9c377b73e78f2548b2732fe34b1/");
    const algorandObj = new AlgorandBridge();
    setSolanaBridgeObj(solanaObj);
    setAlgorandBridgeObj(algorandObj);
  }, []);

  const onPhantom = async () => {
    const phantom = new GlitterWallets.networks[Chains.SOLANA].phantom("https://neat-solitary-darkness.solana-mainnet.quiknode.pro/ceec00cc12c1b9c377b73e78f2548b2732fe34b1/");
    const result = await phantom.connect();
    const phantomProvider = await phantom.getProvider();
    return { address: result, provider: phantomProvider };
  }

  const onDefly = async () => {
    const defly = new GlitterWallets.networks[Chains.ALGO].defly();
    const deflyResponse = await defly.connect();
    return deflyResponse;
  }

  const checkForOptIn = async (tokenSymbol: string) => {
    let optInCheckResult;
    if (sourceNetwork === "solana") {
      optInCheckResult = await solanaBridgeObj?.optInAccountExists(sourceAddress, "usdc");
    } else if (sourceNetwork === "algorand") {
      optInCheckResult = await algorandBridgeObj?.optInAccountExists(sourceAddress, tokenSymbol);
    }

    console.log(optInCheckResult)
    setOptInBtnExists(optInCheckResult as boolean);
    setSelectedSymbol(tokenSymbol);
  }

  const optIn = async () => {
    if (sourceNetwork === "solana") {
      const transaction = await solanaBridgeObj?.optIn(sourceAddress, selectedSymbol);
      // @ts-ignore
      const transactionResponse = await sourceWalletProvider?.signAndSendTransaction(transaction);
      console.log(transactionResponse);
    } else if (sourceNetwork === "algorand") {
      const transaction = await algorandBridgeObj?.optIn(sourceAddress, selectedSymbol);
      // @ts-ignore
      const response = await sourceWalletProvider?.signTransaction([transaction]);
      const transactionResponse = await algorandBridgeObj?.sendSignTransaction(response);
      console.log(transactionResponse);
    }
  }

  const bridge = async () => {
    if (sourceNetwork === "solana") {
      // const transaction = await solanaBridgeObj?.bridge(sourceAddress)
      // @ts-ignore
      // const transactionResponse = await sourceWalletProvider?.signAndSendTransaction(transaction);
      // console.log(transactionResponse);
    } else if (sourceNetwork === "algorand") {
      const transaction = await algorandBridgeObj?.optIn(sourceAddress, selectedSymbol);
      // @ts-ignore
      const response = await sourceWalletProvider?.signTransaction([transaction]);
      const transactionResponse = await algorandBridgeObj?.sendSignTransaction(response);
      console.log(transactionResponse);
    }
  }

  const onWalletConnect = async (wallet: string) => {
    let localSourceAddress = "";
    let sourceProvider;
    let network = "";
    let walletName = "";
    const sourceTokens = [];
    if (wallet === "phantom") {
      const onPhantomResponse = await onPhantom();
      localSourceAddress = onPhantomResponse.address?.toString() as string;
      sourceProvider = onPhantomResponse.provider;
      network = "solana";
      walletName = "phantom";
      const xalgobalance = await solanaBridgeObj?.getBalanceOfToken(localSourceAddress, "xalgo");
      console.log(xalgobalance?.toString());
      sourceTokens.push({ symbol: "xAlgo", balance: xalgobalance });
    } else if (wallet === "defly") {
      const onDeflyResponse = await onDefly();
      localSourceAddress = onDeflyResponse.wallet[0];
      sourceProvider = onDeflyResponse.provider;
      network = "algorand";
      walletName = "defly";
      const xsolbalance = await algorandBridgeObj?.getBalanceOfToken(localSourceAddress, "xsol");
      console.log(xsolbalance?.toString());
      sourceTokens.push({ symbol: "xsol", balance: xsolbalance });
    }
    if (sourceAddress === "") {
      setSourceAddress(localSourceAddress)
      setSourceWalletProvider(sourceProvider);
      setSourceNetwork(network);
      setSourceWallet(walletName);
      // @ts-ignore
      setSourceTokens(sourceTokens);
    } else {
      setDestinationAddress(localSourceAddress);
      setDestinationNetwork(network);
      setDestinationWallet(walletName);
      // @ts-ignore
      setDestinationTokens(sourceTokens);
    }
  }
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