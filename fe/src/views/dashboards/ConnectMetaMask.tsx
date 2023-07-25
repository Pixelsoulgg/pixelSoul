import ComingSoon from "@/components/ComingSoon";
import {
  connectToMetamask,
  connectToWalletConnect,
} from "@/contracts/interfaces/EthersConnect";
import { getToast, isBetaRender } from "@/utils";
import { Box, Text, useToast } from "@chakra-ui/react";
import React from "react";

export default function ConnectMetaMask() {
  const toast = useToast();  
  return (   
    <Box
      cursor="pointer"
      bg="#DC6803"
      justifyContent="center"
      alignItems="center"
      display="flex"
      w="260px"
      h="44px"
      alignSelf="center"
      borderRadius="8px"
      px="16px"
      ml={{ base: "-100px", lg: "0px" }}
      onClick={async () => {
        try {
          await connectToWalletConnect();
        } catch (er: any) {
          toast(getToast(er));
        }
      }}
    >
      <Text variant="with-title" fontSize="16px" color="white">
        Connect MetaMask
      </Text>
    </Box>
  );
}
