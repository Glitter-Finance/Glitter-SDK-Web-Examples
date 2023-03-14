import * as actionTypes from "./actionTypes"
import {WalletAction, DispatchType, IWallet} from "./type";



export function addWallet(wallet: IWallet, type: string) {
  console.log("Add Wallet");
  const action: WalletAction = {
    type: type,
    wallet,
  }

  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: WalletAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}