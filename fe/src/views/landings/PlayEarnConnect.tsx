import { Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import LendingContainer from "./components/LendingContainer";
import InfoCard from "./components/InfoCard";
import MotionViewport from "@/components/animations/MotionViewport";

export default function PlayEarnConnect() {
  return (
    <MotionViewport>
      <LendingContainer contentStyle={{ justifyContent: "center" }}>
        <SimpleGrid w="full" columns={{ base: 1, "2xl": 3 }} gap={20}>
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
    </MotionViewport>
  );
}
