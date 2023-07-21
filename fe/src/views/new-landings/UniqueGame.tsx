import React from "react";
import LandingContainer from "./LandingContainer";
import { HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";

export default function UniqueGame() {
  return (
    <LandingContainer contentStyle={{ minH: "100vh", py: "150px" }}>
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_LANDING}
          className="text-border-blue"
          color="white"
          fontSize="48px"
        >
          UNIQUE GAMES.
        </Text>

        <SimpleGrid w="full" columns={3} columnGap="90px" my="70px !important">
          <Image src="./new-landings/uniques/1.png" cursor="pointer" />
          <Image src="./new-landings/uniques/2.png" cursor="pointer" />
          <Image src="./new-landings/uniques/3.png" cursor="pointer" />
        </SimpleGrid>
      
      <HStack>
        <Image src="./new-landings/all-game-btn.svg" cursor="pointer" />
      </HStack>

      </VStack>
    </LandingContainer>
  );
}
