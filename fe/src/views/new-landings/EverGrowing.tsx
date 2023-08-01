import React from "react";
import { Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import LandingContainer from "./LandingContainer";
import { TextVariants } from "@/themes/theme";
import EverGrowingItem from "./components/EverGrowingItem";

const data = {
  1: {
    name: "Soultag",
    desc: "Own and build very own on-chain identity across the Metaverse.",
  },
  2: {
    name: "Arena",
    desc: "Prove your worth in community-based events and tournaments",
  },
  3: {
    name: "Soul Drops",
    desc: "Earn exclusive rewards as you play games on PixelSoul",
  },
  4: { name: "$SOUL", desc: "One Metaverse united under the $SOUL token" },
};

export default function EverGrowing() {
  return (
    <LandingContainer minH="80vh" py="70px">
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_LANDING}
          className="text-border"
          textAlign="center"
          fontSize={{ base: "35px", lg: "48px" }}
          w={{ base: "100%", lg: "60%" }}
        >
          AN EVER GROWING GAMING SUPER-APP
        </Text>
        <SimpleGrid
          w="full"
          columns={{ base: 1, lg: 4 }}
          columnGap="77px"
          mt="70px !important"
          rowGap="70px"
        >
          {new Array(4).fill(0).map((_, index) => (
            <Center key={index}>
              <EverGrowingItem
                key={index}
                index={index + 1}
                name={data[(index + 1) as keyof typeof data].name}
                desc={data[(index + 1) as keyof typeof data].desc}
              />
            </Center>
          ))}
        </SimpleGrid>
      </VStack>
    </LandingContainer>
  );
}
