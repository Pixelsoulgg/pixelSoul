import React from "react";
import LandingContainer from "./LandingContainer";
import {
  Center,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import { m } from "framer-motion";
import { Animate } from "@/components/animations";

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

        <SimpleGrid
          w="full"
          columns={{ base: 1, lg: 3 }}
          columnGap="90px"
          rowGap="90px"
          my="70px !important"
        >
          {new Array(3).fill(1).map((_, index) => (
            <Center key={index}>
              <Image
                src={`./new-landings/uniques/${index + 1}.png`}
                as={m.img}
                whileHover={Animate.whileHover}
                whileTap={Animate.whileTap}
                cursor="pointer"
              />
            </Center>
          ))}
        </SimpleGrid>

        <HStack>
          <Image
            src="./new-landings/all-game-btn.svg"
            cursor="pointer"
            as={m.img}
            whileTap={{
              scaleX: 0.98,
              boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)",
            }}
          />
        </HStack>
      </VStack>
    </LandingContainer>
  );
}
