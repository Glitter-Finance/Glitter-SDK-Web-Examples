import {Box, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import Item from "../Item";
import {Wallets as GlitterWallets, Chains, SolanaBridge, AlgorandBridge, EVMBridge} from "glitter-bridge-sdk-web-dev";
import {useCallback} from "react";
import {useCallbacks} from "../store/callbacks";
import {useSelectors} from "../store/selectors";
import {ADD_DESTINATION_WALLET, ADD_SOURCE_WALLET} from "../store/actionTypes";
import {BridgeNetworksName, RPC_URL} from "../store/type";

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
          sourceNetworkName: BridgeNetworksName.SOLANA,
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: result?.toString(),
          destinationWalletName: "phantom",
          destinationWalletProvider: phantomProvider,
          destinationNetworkName: BridgeNetworksName.SOLANA,
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }
    }, [saveWallet, wallet]);

  const onSolflare = useCallback(
    async () => {
      const solflare = new GlitterWallets.networks[Chains.SOLANA].solfare(RPC_URL);
      const result = await solflare.connect();
      const solflareProvider = await solflare.getProvider();
      let balances: { token: string; balance: number | undefined }[] = [];

      const solanaBridge = new SolanaBridge(RPC_URL);
      balances = await solanaBridge.getBalancesOfBridgeTokens(result?.toString() as string)

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: result?.toString(),
          sourceWalletName: "solflare",
          sourceWalletProvider: solflareProvider,
          sourceNetworkName: BridgeNetworksName.SOLANA,
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: result?.toString(),
          destinationWalletName: "solflare",
          destinationWalletProvider: solflareProvider,
          destinationNetworkName: BridgeNetworksName.SOLANA,
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

      const algorandBridge = new AlgorandBridge();
      balances = await algorandBridge.getBalancesOfBridgeTokens(deflyResponse.wallet[0] as string)

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: deflyResponse.wallet[0],
          sourceWalletName: "defly",
          sourceWalletProvider: deflyResponse.provider,
          sourceNetworkName: BridgeNetworksName.ALGORAND,
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: deflyResponse.wallet[0],
          destinationWalletName: "defly",
          destinationWalletProvider: deflyResponse.provider,
          destinationNetworkName: BridgeNetworksName.ALGORAND,
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }
    }, [saveWallet, wallet]);

  const onPera = useCallback(
    async () => {
      const pera = new GlitterWallets.networks[Chains.ALGO].pera();
      let peraResponse;
      let balances: { token: string; balance: number | undefined }[] = [];

      try {
        peraResponse = await pera.connect();
      } catch (e) {
        peraResponse = await pera.reconnect();
      }

      const algorandBridge = new AlgorandBridge();
      balances = await algorandBridge.getBalancesOfBridgeTokens(peraResponse.address as string)

      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: peraResponse.address,
          sourceWalletName: "pera",
          sourceWalletProvider: peraResponse.wallet,
          sourceNetworkName: BridgeNetworksName.ALGORAND,
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: peraResponse.address,
          destinationWalletName: "pera",
          destinationWalletProvider: peraResponse.wallet,
          destinationNetworkName: BridgeNetworksName.ALGORAND,
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }
    }, [saveWallet, wallet]
  )

  const onMetamask = useCallback(
    async () => {
      const metamask = new GlitterWallets.networks[Chains.ETHEREUM].metamask();
      const result = await metamask.connect();
      const evmBridge = new EVMBridge("avalanche");
      let balances: { token: string; balance: any | undefined }[] = [];
      balances = await evmBridge.getBalancesOfBridgeTokens(result.data[0])
      console.log(balances);
      if (wallet.sourceWalletName === "") {
        saveWallet({
          sourceWalletAddress: result.data[0],
          sourceWalletName: "metamask",
          sourceWalletProvider: await metamask.getProvider(),
          sourceNetworkName: BridgeNetworksName.AVALANCHE,
          sourceTokens: balances
        }, ADD_SOURCE_WALLET);
      } else {
        saveWallet({
          destinationWalletAddress: result.data[0],
          destinationWalletName: "metamask",
          destinationWalletProvider: await metamask.getProvider(),
          destinationNetworkName: BridgeNetworksName.AVALANCHE,
          destinationTokens: balances
        }, ADD_DESTINATION_WALLET);
      }

    }, [saveWallet, wallet])

  return (
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Connect Wallets"/>
      <CardContent>
        <Stack>
          <Item>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <img src="/solflare.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => {
                  onSolflare()
                }}>Solflare</Link>
              </Typography>
            </Box>
          </Item>
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
          <Item>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <img src="/metamask.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => {
                  onMetamask()
                }}>Metamask</Link>
              </Typography>
            </Box>
          </Item>
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
          <Item>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <img src="/pera.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => {
                  onPera()
                }}>Pera</Link>
              </Typography>
            </Box>
          </Item>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Wallets;
