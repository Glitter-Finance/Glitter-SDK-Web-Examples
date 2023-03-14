import {Box, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import Item from "../Item";
import {Wallets as GlitterWallets, Chains, SolanaBridge, AlgorandBridge} from "glitter-bridge-sdk-web-dev";
import {useCallback} from "react";
import {useCallbacks} from "../store/callbacks";
import {useSelectors} from "../store/selectors";
import {ADD_DESTINATION_WALLET, ADD_SOURCE_WALLET} from "../store/actionTypes";
import {RPC_URL} from "../store/type";

declare global {
  interface Window {
    coin98?: any;
  }
}

// @ts-ignore
function Wallets() {
  const {wallet} = useSelectors();
  const {saveWallet} = useCallbacks();
  const onPhantom = useCallback(
    async () => {
      const phantom = new GlitterWallets.networks[Chains.SOLANA].phantom(RPC_URL);
      const result = await phantom.connect();
      const phantomProvider = await phantom.getProvider();
      let balances: { token: string; balance: number | undefined }[] = [];

      const solanaBridge = new SolanaBridge(RPC_URL);
      balances = await solanaBridge.getBalancesOfBridgeTokens(result?.toString() as string)

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: result?.toString(),
          sourceWalletName: "phantom",
          sourceWalletProvider: phantomProvider,
          sourceNetworkName: "solana",
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: result?.toString(),
          destinationWalletName: "phantom",
          destinationWalletProvider: phantomProvider,
          destinationNetworkName: "solana",
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }
    }, [saveWallet, wallet]);

  const onDefly = useCallback(
    async () => {
      const defly = new GlitterWallets.networks[Chains.ALGO].defly();
      let deflyResponse;
      let balances: { token: string; balance: number | undefined }[] = [];

      try {
        deflyResponse = await defly.connect();
      } catch (e) {
        deflyResponse = await defly.reconnect();
      }

      const solanaBridge = new AlgorandBridge();
      balances = await solanaBridge.getBalancesOfBridgeTokens(deflyResponse.wallet[0] as string)

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: deflyResponse.wallet[0],
          sourceWalletName: "defly",
          sourceWalletProvider: deflyResponse.provider,
          sourceNetworkName: "algorand",
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: deflyResponse.wallet[0],
          destinationWalletName: "defly",
          destinationWalletProvider: deflyResponse.provider,
          destinationNetworkName: "algorand",
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }
    }, [saveWallet, wallet]);

  const onMetamask = useCallback(
    async () => {
      const metamask = new GlitterWallets.networks[Chains.ETHEREUM].metamask();
      const result = await metamask.connect();

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: result.data[0],
          sourceWalletName: "metamask",
          sourceWalletProvider: await metamask.getProvider(),
          sourceNetworkName: "ethereum",
          // sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: result.data[0],
          destinationWalletName: "metamask",
          destinationWalletProvider: await metamask.getProvider(),
          destinationNetworkName: "ethereum",
          // destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }

    }, [saveWallet, wallet])


  // const onDefly = async () => {
  //   const defly = new GlitterWallets.networks[Chains.ALGO].defly();
  //   const deflyResponse = await defly.connect();
  //   console.log(deflyResponse.wallet);
  //   const algorandBridge = new AlgorandBridge();
  //   const algoTransactions = await algorandBridge.optIn(deflyResponse.wallet[0], "ALGO");
  //
  //   const response = await deflyResponse.provider.signTransaction([algoTransactions]);
  //   console.log(response);
  //   const transactionResponse = await algorandBridge.sendSignTransaction(response);
  //   console.log(transactionResponse);
  //
  //   // const phantom = new GlitterWallets.networks[Chains.SOLANA].phantom("https://neat-solitary-darkness.solana-mainnet.quiknode.pro/ceec00cc12c1b9c377b73e78f2548b2732fe34b1/");
  //   // const result = await phantom.connect();
  //   //
  //   // const solanaBridge = new SolanaBridge("https://neat-solitary-darkness.solana-mainnet.quiknode.pro/ceec00cc12c1b9c377b73e78f2548b2732fe34b1/");
  //   // const optInTransaction = await solanaBridge.optIn(result?.toString() as string, "xalgo");
  //   // const phantomProvider = await phantom.getProvider();
  //   // await phantomProvider.signAndSendTransaction(optInTransaction);
  //
  //   // const transaction = await algorandBridge.bridge(deflyResponse.wallet[0], "algo", "solana", result?.toString() as string, "xalgo", 5);
  //   //
  //   // const response = await deflyResponse.provider.signTransaction([transaction]);
  //   // console.log(response);
  //   // const transactionResponse = await algorandBridge.sendSignTransaction(response);
  //   // console.log(transactionResponse);
  // }

  return (
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Connect Wallets"/>
      <CardContent>
        <Stack>
          <Item>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => {
                  onPhantom()
                }}>Phantom</Link>
              </Typography>
            </Box>
          </Item>
          {/*<Item>*/}
          {/*  <Box sx={{display: 'flex', alignItems: 'flex-end'}}>*/}
          {/*    <img src="/phantom.png" className="input-image" alt="broken"/>*/}
          {/*    <Typography>*/}
          {/*      <Link onClick={() => {*/}
          {/*        onMetamask()*/}
          {/*      }}>Metamask</Link>*/}
          {/*    </Typography>*/}
          {/*  </Box>*/}
          {/*</Item>*/}
          <Item>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <img src="/defly.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => {
                  onDefly()
                }}>Defly</Link>
              </Typography>
            </Box>
          </Item>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Wallets;
