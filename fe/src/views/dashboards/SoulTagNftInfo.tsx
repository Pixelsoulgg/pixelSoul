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
      p="10px 20px"
      justifyContent='space-around'
      bgColor="#FFF"
      boxShadow="0px 4px 6px 0px rgba(0, 0, 0, 0.25)"
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
