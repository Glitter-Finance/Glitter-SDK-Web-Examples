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

export const RPC_URL = "https://neat-solitary-darkness.solana-mainnet.quiknode.pro/ceec00cc12c1b9c377b73e78f2548b2732fe34b1/";

export enum BridgeNetworksName {
  ALGORAND = "algorand",
  SOLANA = "Solana",
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  AVALANCHE = "avalanche",
}

export const Chains = [
  {
    name: BridgeNetworksName.SOLANA,
    icon: "Solana.png",
    wallets: [
      {
        name: "phantom",
        icon: "phantom.png",
      },
      {
        name: "solflare",
        icon: "solflare.png",
      }
    ]
  },
  {
    name: BridgeNetworksName.ALGORAND,
    icon: "Algorand.png",
    wallets: [
      {
        name: "defly",
        icon: "defly.png",
      },
      {
        name: "pera",
        icon: "pera.png",
      }
    ]
  },
  {
    name: BridgeNetworksName.ETHEREUM,
    icon: "ethereum.png",
    wallets: [
      {
        name: "metamask",
        icon: "metamask.png",
      }
    ]
  },
  {
    name: BridgeNetworksName.AVALANCHE,
    icon: "avalanche.png",
    wallets: [
      {
        name: "metamask",
        icon: "metamask.png",
      }
    ]
  },
  {
    name: BridgeNetworksName.POLYGON,
    icon: "polygon.png",
    wallets: [
      {
        name: "metamask",
        icon: "metamask.png",
      }
    ]
  }
]
