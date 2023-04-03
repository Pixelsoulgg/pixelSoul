declare var window: any;
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import store from "../../reduxs/store";
import {
  generateContract,
  setProvider,
} from "../../reduxs/accounts/account.actions";
import WalletConnectProvider from "@walletconnect/web3-provider";

const BINANCE_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const walletConnectProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        97: BINANCE_TESTNET,
        56: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};

export const connectToMetamask = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    store.dispatch(setProvider(provider));
    await store.dispatch(generateContract(provider));
  }
};

export const disconnectMetaMask = async () => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: {} }],
  });
};

export const connectToWalletConnect = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: walletConnectProviderOptions,
  });
  const provider = await web3Modal.connect(); 
  const web3Provider = new ethers.providers.Web3Provider(provider);  
  store.dispatch(setProvider(provider));
  await store.dispatch(generateContract(provider));
};
