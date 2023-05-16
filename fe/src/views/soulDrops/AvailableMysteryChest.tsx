import { useAppSelector } from "@/reduxs/hooks";
import {
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ChestCard from "./components/ChestCard";


export default function AvailableMysteryChest() {
  const { steamId } = useAppSelector((p) => p.auth);
  return (
    <Flex w="full" my="15px" flexDirection="column">
      <Text variant="with-24">Available Mystery Chest</Text>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} columnGap="20px"> 
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <ChestCard
              chestName="Chest_name"
              key={String(index)}
              text={`${index === 0 ? 10 : index * 50}H of Steam Gameplay`}
              src={`/chests/${index + 1}.svg`}
              isClaimed={false}
              steamConnected={!!steamId}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
}
