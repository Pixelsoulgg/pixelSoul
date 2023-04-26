import ConfirmModal from "@/components/ConfirmModal";
import { disconnectMetaMask } from "@/contracts/interfaces/EthersConnect";
import { disconnectMetamaskAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getToast } from "@/utils";
import { showSortAddress } from "@/utils";
import {
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Image,
  useDisclosure,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

const DEFAULT_MESSAGE = "Not connected yet";

export default function AccountInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const dispatch = useAppDispatch();

  const { steamInfo, steamId } = useAppSelector((p) => p.auth);
  const { walletInfo } = useAppSelector((p) => p.account);

  const handleDisconnectMetamask = useCallback(async () => {
    await disconnectMetaMask();
    dispatch(disconnectMetamaskAction());
    onClose();
  }, [dispatch, onClose]);

  useEffect(() => {
    setValue(walletInfo?.address || '')
  }, [setValue, walletInfo]); 


  const handleCopy= useCallback(() => {
    onCopy();
    toast(getToast("copied", "success", ""))
  }, [onCopy, toast]);

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
          {!walletInfo && (
            <Text variant="with-18" color="#98A2B3">
              {DEFAULT_MESSAGE}
            </Text>
          )}
          {walletInfo && (
            <HStack w="full">
              <Text variant="with-18">
                {showSortAddress(walletInfo?.address || "") || DEFAULT_MESSAGE}
              </Text>
              <Image
                src="/copy.svg"
                alt="copy wallet address"
                cursor="pointer"
                onClick={handleCopy}
              />
              <Spacer />
              <Text variant="with-18">Sign Out</Text>
              <Image
                cursor="pointer"
                alt="sign out your metamask"
                src="/sign-out.svg"
                onClick={onOpen}
              />
            </HStack>
          )}
        </VStack>
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        title="Are you sure you want to sign out of this account?"
        onClose={onClose}
        onOk={handleDisconnectMetamask}
      />
    </>
  );
}
