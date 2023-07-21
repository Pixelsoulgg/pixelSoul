import React from "react";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import LandingContainer from "./LandingContainer";
import { TextVariants } from "@/themes/theme";
import EverGrowingItem from "./components/EverGrowingItem";

export default function EverGrowing() {
  return (
    <LandingContainer minH="80vh" py="70px">
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_LANDING}
          className="text-border"
          textAlign="center"
          fontSize="48px"
          w="60%"
        >
          AN EVER GROWING GAMING SUPER-APP
        </Text>
        <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} columnGap="77px" mt="70px !important">
          {new Array(4).fill(0).map((_, index) => (
            <EverGrowingItem key={index} index={index + 1} />
          ))}
        </SimpleGrid>
      </VStack>
    </LandingContainer>
  );
}
