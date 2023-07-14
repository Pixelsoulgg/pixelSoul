import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import MainButton from "./components/MainButton";
import { ConnectButton, ErrorCode, useWallet } from "@suiet/wallet-kit";
import { showSortAddress } from "@/utils";


export default function Header() {
  const {address} = useWallet();
  return (
    <HStack justifyContent="flex-end" spacing="35px">
      <MainButton lable="100 SoulTag" showLogo />
      {!address && <ConnectButton
        style={{backgroundColor: 'transparent'}}
      >
      <MainButton lable="Connect Wallet" />
      </ConnectButton>}
      {address && <MainButton lable={showSortAddress(address)} />}
    </HStack>
  );
}
