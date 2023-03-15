export interface IWallet {
  sourceWalletAddress?: string;
  sourceWalletProvider?: any;
  sourceNetworkName?: string;
  sourceWalletName?: string;
  destinationWalletAddress?: string;
  destinationWalletName?: string;
  destinationNetworkName?: string;
  destinationWalletProvider?: any;
  sourceTokens?: { token: string; balance: number | undefined }[];
  destinationTokens?: { token: string; balance: number | undefined }[];
  selectedSourceTokenSymbol?: string;
  selectedDestinationTokenSymbol?: string;
}

export type WalletAction = {
  type: string
  wallet: IWallet
}

export type DispatchType = (args: WalletAction) => WalletAction

export const RPC_URL = "";

export enum BridgeNetworksName {
  ALGORAND = "Algorand",
  SOLANA = "Solana",
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  AVALANCHE = "avalanche",
}
