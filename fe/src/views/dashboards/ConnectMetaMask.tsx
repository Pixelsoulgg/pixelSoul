import { connectToMetamask } from "@/contracts/interfaces/EthersConnect";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function ConnectMetaMask() {
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
      onClick={connectToMetamask}
    >
      <Text variant="with-title" fontSize="16px" color="white">
        Connect Wallet
      </Text>
    </Box>
  );
}
