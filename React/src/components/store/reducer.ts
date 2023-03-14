import * as actionTypes from "./actionTypes"
import {WalletAction, IWallet} from "./type";

const initialState: IWallet = {
  sourceNetworkName: "",
  sourceWalletAddress: "",
  sourceWalletName: "",
  sourceWalletProvider: "",
  destinationNetworkName: "",
  destinationWalletAddress: "",
  destinationWalletName: "",
  destinationWalletProvider: "",
  sourceTokens: [],
  destinationTokens: [],
  selectedDestinationTokenSymbol: "",
  selectedSourceTokenSymbol: "",
}

const reducer = (
  state: IWallet = initialState,
  action: WalletAction
): IWallet => {
  switch (action.type) {
    case actionTypes.ADD_SOURCE_WALLET:
      return {
        ...state,
        sourceWalletName: action.wallet.sourceWalletName,
        sourceWalletAddress: action.wallet.sourceWalletAddress,
        sourceNetworkName: action.wallet.sourceNetworkName,
        sourceWalletProvider: action.wallet.sourceWalletProvider,
        sourceTokens: action.wallet.sourceTokens,
      }
    case actionTypes.ADD_DESTINATION_WALLET:
      return {
        ...state,
        destinationNetworkName: action.wallet.destinationNetworkName,
        destinationWalletAddress: action.wallet.destinationWalletAddress,
        destinationWalletName: action.wallet.destinationWalletName,
        destinationWalletProvider: action.wallet.destinationWalletProvider,
        destinationTokens: action.wallet.destinationTokens,
      }
  }
  return state
}

export default reducer