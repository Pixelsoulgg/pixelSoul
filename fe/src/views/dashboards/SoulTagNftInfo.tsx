import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getSuiTagProfileAction } from "@/reduxs/suinft/sui.actions";
import { getToast, showSortAddress } from "@/utils";
import {
  Flex,
  HStack,
  Text,
  Image,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useWallet } from "@suiet/wallet-kit";
import React, { useCallback, useEffect } from "react";

export default function SoulTagNftInfo() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {address: suiAddress} = useWallet();
  const { soulTagNft, reputation } = useAppSelector((p) => p.suinft);
  const { onCopy: onSuiNftCopy, setValue: setValueSuiNft } = useClipboard("");

  useEffect(() => {
    if (suiAddress) {
      dispatch(getSuiTagProfileAction(suiAddress))
    }
  }, [suiAddress]);

  useEffect(() => {
    setValueSuiNft(soulTagNft?.objectId || "");    
  }, [soulTagNft, soulTagNft?.objectId]);


  const handleCopy = useCallback(
    (isSui = false) => {
      if (isSui) onSuiNftCopy();
      toast(getToast("copied", "success", ""));
    },
    [toast]
  );

  return (
    <Flex
      w="85%"
      borderRadius="8px"
      bgColor="#F2F4F7"
      border="1px solid #4691FF"
      p="10px 20px"
      justifyContent='space-around'
    >
      <HStack w="full">
        <Text variant="with-18">
          Object ID: 
          {showSortAddress(soulTagNft?.objectId || '')}
        </Text>
        <Image
          src="/copy.svg"
          alt="copy wallet address"
          cursor="pointer"
          onClick={() => handleCopy(true)}
        />
      </HStack>

      <HStack w="full">
        <Image
          src="/1.svg"
          alt="copy wallet address"
          cursor="pointer"
          mr="35px"
        />
        <Text variant="with-18">
         Name: 
        {soulTagNft?.name}
        </Text>
        
      </HStack>
      <HStack w="full">
        <Image
          src="/1.svg"
          alt="copy wallet address"
          cursor="pointer"
          mr="35px"
        />
        <Text variant="with-18">
        Reputation:
        {reputation}
        </Text>
        
      </HStack>
    </Flex>
  );
}
