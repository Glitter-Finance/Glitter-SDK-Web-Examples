import {IWallet, WalletAction} from "./type";
import {Dispatch, useCallback} from "react";
import {addWallet} from "./actionCreators";
import {useDispatch} from "react-redux";

export function useCallbacks() {
  const dispatch: Dispatch<any> = useDispatch()
  const saveWallet = useCallback(
    (wallet: IWallet, type: string) => dispatch(addWallet(wallet, type)),
    [dispatch]
  )

  return { saveWallet };
}