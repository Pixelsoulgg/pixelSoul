import { Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import LendingContainer from "./components/LendingContainer";
import InfoCard from "./components/InfoCard";

export default function SoulScoreShowcase() {
  return (
    <LendingContainer contentStyle={{ justifyContent: "center" }}
      mb={{base: "150px", lg: "0px"}}
    >
      <SimpleGrid w="full" columns={{ base: 1, "2xl": 2 }} gap={20}>
        <Center>
          <InfoCard
            name="SoulScore"
            img="4"
            des="Rank up your SoulScore and become a legend"
            minW={{base: "390px", lg: "741px"}}
            imgStyle={{
              w: {base: "90%", lg: "fit-content"}
            
            }}
          />
        </Center>
        <Center>
          <InfoCard
            name="Showcase"
            img="5"
            des="Earn rare one-of-a-kind collectibles and show them off"
            minW={{base: "390px", lg: "741px"}}
            imgStyle={{
              w: {base: "90%", lg: "fit-content"}
            
            }}
          />
        </Center>
      </SimpleGrid>
    </LendingContainer>
  );
}
