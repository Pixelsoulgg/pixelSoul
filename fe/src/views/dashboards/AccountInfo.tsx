import ConfirmModal from "@/components/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getToast } from "@/utils";
import { showSortAddress } from "@/utils";
import {
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Image,
  useDisclosure,
  useClipboard,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useWallet } from "@suiet/wallet-kit";
import React, { useCallback, useEffect, useState } from "react";
import SuiWalletConnector from "./SuiWalletConnector";
import { disconnectMetaMask } from "@/contracts/interfaces/EthersConnect";
import { disconnectMetamaskAction } from "@/reduxs/accounts/account.actions";
import { useAddSuiWalletMutation } from "@/services/modules/game.check.services";

const DEFAULT_MESSAGE = "Not connected yet";

export default function AccountInfo() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const wallet = useWallet();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { onCopy: onMetaMaskCopy, setValue: setValueMetaMask } = useClipboard("");
  const { onCopy: onSuiCopy, setValue: setValueSui } = useClipboard("");

  const { steamInfo, steamId, auth0Sub, auth0Info } = useAppSelector((p) => p.auth);
  const { walletInfo } = useAppSelector((p) => p.account);
  const [disconnectType, setDisconnectType] = useState<'SUI' | 'METAMASK'>();

  const [addSuiWallet, addSuiWalletResult] = useAddSuiWalletMutation()

  const handleDisconnectWallet = async () => {
    if (wallet.address && disconnectType === 'SUI') {
      await wallet.disconnect();      
    } else {
      await disconnectMetaMask();
      dispatch(disconnectMetamaskAction())
    }
    onClose();
  };

  useEffect(() => {
    setValueMetaMask(walletInfo?.address || "");
    setValueSui(wallet?.address || "");
  }, [wallet, walletInfo]);

  const handleCopy = useCallback((isSui = false) => {
    if (isSui)
       onSuiCopy()
   else 
      onMetaMaskCopy();
    toast(getToast("copied", "success", ""));
  }, [toast]);


  const handlePostSuiWalletToApi = useCallback(async() => {
    try {
      if (wallet && wallet.address) {
        await addSuiWallet({auth0Sub: auth0Sub, suiWalletAddress: wallet.address}).unwrap();
      } 
    } catch(ex) {}
   
  }, [wallet, wallet.address]);

  useEffect(() => {
    handlePostSuiWalletToApi();
  }, [handlePostSuiWalletToApi]);


  return (
    <>
      <Flex w="full" flexDirection="column" borderBottom="1.5px solid #E4E7EC">
        <Text variant="with-24">Steam Account</Text>
        <Text
          variant="with-18"
          color={steamInfo?.["openid.sig"] ? "#475467" : "#98A2B3"}
        >
          {steamId || DEFAULT_MESSAGE}
        </Text>

        <VStack w="full" alignItems="flex-start" my="30px">
          <Text variant="with-24">Wallet ID</Text>
          {!auth0Info?.walletAddress && (
            <Text variant="with-18" color="#98A2B3">
              {DEFAULT_MESSAGE}
            </Text>
          )}
          {auth0Info?.walletAddress && (
            <HStack w="full">
              <Text variant="with-18">
                {showSortAddress(auth0Info?.walletAddress || "") || DEFAULT_MESSAGE}
              </Text>
              <Image
                src="/copy.svg"
                alt="copy wallet address"
                cursor="pointer"
                onClick={() => handleCopy(false)}
              />
              <Spacer />
              {/* <Text variant="with-18">Sign Out</Text>
              <Image
                cursor="pointer"
                alt="sign out your wallet"
                src="/sign-out.svg"
                onClick={() => {
                  onOpen();
                  setDisconnectType('METAMASK');
                }}
              /> */}
            </HStack>
          )}
        </VStack>

        <VStack w="full" alignItems="flex-start" mb="30px">
          <Text variant="with-24">Sui Wallet ID</Text>
          {!auth0Info?.suiWalletAddress && (
            <HStack w="full">
              <Text variant="with-18" color="#98A2B3">
                {DEFAULT_MESSAGE}
              </Text>
              <Spacer />
              <SuiWalletConnector />
            </HStack>
          )}
          {auth0Info?.suiWalletAddress && (
            <HStack w="full">
              <Text variant="with-18">
                {showSortAddress(wallet.address || "") || DEFAULT_MESSAGE}
              </Text>
              <Image
                src="/copy.svg"
                alt="copy wallet address"
                cursor="pointer"
                onClick={() => handleCopy(true)}
              />
              <Spacer />
              {/* <Text variant="with-18">Sign Out</Text>
              <Image
                cursor="pointer"
                alt="sign out your wallet"
                src="/sign-out.svg"
                onClick={() => {
                  onOpen();
                  setDisconnectType('SUI');
                }}
              /> */}
            </HStack>
          )}
        </VStack>
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        title="Are you sure you want to sign out of this account?"
        onClose={onClose}
        onOk={handleDisconnectWallet}
      />
    </>
  );
}
