import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  gold?: number;
}

export default function GoldButton({gold = 0}: IProps) {
  return (
    <Box
      bg="#F9FAFB"
      h="44px"
      display="flex"
      alignItems="center"
      px="14px"
      minW="131px"
      borderRadius="8px"
      border="1px solid #FD853A"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.25)"
      justifyContent="center"
    >
      <Image src="/gold.svg" mr="10px" />
      <Text color="#667085">{gold} Gold</Text>
    </Box>
  );
}
