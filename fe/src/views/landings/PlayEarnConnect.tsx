import { Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import LendingContainer from "./components/LendingContainer";
import InfoCard from "./components/InfoCard";

export default function PlayEarnConnect() {
  return (
      <LendingContainer contentStyle={{ justifyContent: "center" }}>
        <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} gap={20}>
          <Center>
            <InfoCard
              name="Play"
              img="1"
              des="Play all your favorite Steam games"
            />
          </Center>
          <Center>
            <InfoCard
              name="Earn"
              img="2"
              des="Earn awesome rewards just by playing"
            />
          </Center>
          <Center>
            <InfoCard
              name="Connect"
              img="3"
              des="Forge your alliance and play together"
            />
          </Center>
        </SimpleGrid>
      </LendingContainer>
  );
}
