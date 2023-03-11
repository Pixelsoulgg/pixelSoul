import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function GoldButton() {
  return (
    <Box
      w="300px"
      h="44px"
      display="flex"
      alignItems="center"
      px="42px"
      borderRadius="8px"
      border="1px solid #D0D5DD"
    >
      <Text>500 Gold</Text>
    </Box>
  );
}
