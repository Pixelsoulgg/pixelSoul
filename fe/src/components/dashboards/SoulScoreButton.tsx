import { TextVariants } from "@/themes/theme";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  soul?: number | string;
}

export default function SoulScoreButton({soul = 0}: IProps) {
  return (
    <Box
      h="44px"
      display="flex"
      alignItems="center"
      px="14px"
      minW="160px"
      borderRadius="8px"
      border="1px solid #4691FF"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.25)"
      justifyContent="center"
      bg="white"
    >
      <Image src="/logo-only.svg" mr="10px" w="22px" h="36px" />
      <Text variant={TextVariants.WITH_18} color="#667085">{soul} SoulScore</Text>
    </Box>
  );
}
