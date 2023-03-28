import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { IWalletInfo } from "../../types";

export const logoutAction = createAction("account/logoutAction");
export const setActiveMenu = createAction<string>("account/setActiveMenu");

export const setProvider = createAction<ethers.providers.Web3Provider>(
  "account/setProvider"
);

export const generateContract = createAsyncThunk<
  IWalletInfo,
  ethers.providers.Web3Provider
>("account/generateContract", async (provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await signer.getBalance();
  const bnb = Number.parseFloat(ethers.utils.formatEther(balance));
  return { address, bnbBalance: bnb };
});
