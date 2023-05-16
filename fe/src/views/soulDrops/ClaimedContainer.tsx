import { useAppSelector } from "@/reduxs/hooks";
import {
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ChestCard from "./components/ChestCard";
import { useGetChestQuery, useGetMysteryChestQuery } from "@/services/modules/game.check.services";

export default function ClaimedContainer() {
  const { steamId, auth0Sub } = useAppSelector((p) => p.auth);
  const {data: mysteryChestData, isLoading} = useGetMysteryChestQuery(auth0Sub, {skip: !steamId || !auth0Sub});
  const {data: chestData, isLoading: isChestLoading} = useGetChestQuery(auth0Sub, {skip: !steamId || !auth0Sub});

  return (
    <Flex w="full" my="15px" flexDirection="column">
      <Text variant="with-24">
       Claimed
      </Text>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} columnGap="20px">
        {mysteryChestData?.map((_, index) => (
            <ChestCard 
              chestName="Mystery chest"
              text="0k"     
              key={String(index)}     
              src={`/chests/${index+1}.svg`}
              isClaimed
              steamConnected ={!!steamId}
            />
          ))}

        {chestData?.map((chest, index) => (
            <ChestCard 
              chestName={`${chest.chest.rarity} chest`}
              text="0k"     
              key={String(index)}     
              src={`/chests/${index+1}.svg`}
              isClaimed
              steamConnected ={!!steamId}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
}
