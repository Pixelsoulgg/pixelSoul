import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getProfile } from "../../apis";
import { IRequestInfo } from "../../contracts/types";
import { IFlipModel, IWalletInfo } from "../../types";
import { timer } from "../../utils";
import stores from "../store";

export const logoutAction = createAction("account/logoutAction");

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


export const getScoreAction = createAsyncThunk<any>("account/getScore", async () => {  
  const rs = await getProfile();
  return rs;
});