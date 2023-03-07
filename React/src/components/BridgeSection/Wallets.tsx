import {Box, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import Item from "../Item";
import { Wallets as GlitterWallets, Chains, SolanaBridge, AlgorandBridge } from "glitter-bridge-sdk-web-dev";
declare global {
  interface Window {
    coin98?: any;
  }
}
function Wallets() {

  const onMetamask = async () => {
  }

  const onPhantom = async () => {
    const phantom = new GlitterWallets.networks[Chains.SOLANA].phantom("RPC_URL");
    const result = await phantom.connect();
    const bridge = new SolanaBridge("RPC_URL");
    const optInTransaction = await bridge.optIn(result?.toString() as string, "RAY");
    const phantomProvider = await phantom.getProvider();
    await phantomProvider.signAndSendTransaction(optInTransaction);
  }

  const onSolfare = () => {

  }

  const onPera = async () => {

  }

  const onCoin98 = async () => {

  }

  const onDefly = async () => {
    const defly = new GlitterWallets.networks[Chains.ALGO].defly();
    const deflyResponse = await defly.connect();
    console.log(deflyResponse.wallet);
    const bridge = new AlgorandBridge();
    const algoTransactions = await bridge.optIn(deflyResponse.wallet[0], "xGLI");
    let txs = algoTransactions.map((txn) => {
      return {
        txn: txn,
      };
    });
    const response = await deflyResponse.provider.signTransaction([txs]);
    console.log(response);
    const transactionResponse = await bridge.sendSignTransaction(response);
    console.log(transactionResponse);
  }

  return(
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Connect Wallets"/>
      <CardContent>
        <Stack>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onPhantom() }}>Phantom</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

              <img src="/solflare.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onSolfare() }}>Solfare</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onMetamask() }}>Metamask</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onPera() }}>Pera</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onCoin98() }}>Coin98</Link>
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image" alt="broken"/>
              <Typography>
                <Link onClick={() => { onDefly() }}>Defly</Link>
              </Typography>
            </Box>
          </Item>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Wallets;
