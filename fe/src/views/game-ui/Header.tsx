import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import MainButton from "./components/MainButton";

export default function Header() {
  return (
    <HStack justifyContent="flex-end" spacing="35px">
      <MainButton lable="100 SoulTag" showLogo />
      <MainButton lable="Connect Wallet" />
    </HStack>
  );
}
