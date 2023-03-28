import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function PixelSould() {
  return (
    <HStack>
      <Image src="/logo.svg" alt="PixelSoul" mr="10px" />
      <Text
        variant="with-heading"
        fontSize="24px"
        fontWeight="600"
        lineHeight="32px"
        display={{ base: "none", lg: "inline-block" }}
      >
        PixelSoul
      </Text>
    </HStack>
  );
}
