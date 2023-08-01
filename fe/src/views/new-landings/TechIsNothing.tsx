import React from "react";
import LandingContainer from "./LandingContainer";
import { VStack, Text, HStack, Image } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import Link from "next/link";

export default function TechIsNothing() {
  return (
    <LandingContainer
      w="full"
      bg="red"
      bgImage="./new-landings/body-bg-1.png"
      bgSize="cover"
      bgRepeat="no-repeat"
      contentStyle={{
        justifyContent: "center",
        alignItems: "center",
        minH: "535px",
      }}
    >
      <VStack
        w="full"
        maxW="783px"
        minH="233px"
        bg="rgba(255, 255, 255, 0.25)"
        borderRadius="8px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          variant={TextVariants.WITH_18}
          fontSize={{ base: "30px", lg: "40px" }}
          color="#fff"
          textAlign="center"
          lineHeight="normal"
        >
          Tech is nothing without a community.
        </Text>
        <HStack mt="32px !important">
          <Link href="http://twitter.com/pixelsoulGG">
            <Image src="./new-landings/twitter.png" />
          </Link>
          <Link href="https://discord.gg/yBHkAEAQGM">
            <Image src="./new-landings/discord.png" />
          </Link>
        </HStack>
      </VStack>
    </LandingContainer>
  );
}
