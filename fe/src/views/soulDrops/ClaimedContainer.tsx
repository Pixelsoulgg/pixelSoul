import { useAppSelector } from "@/reduxs/hooks";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import ChestCard from "./components/ChestCard";
import {
  useGetChestQuery,
  useGetMysteryChestQuery,
} from "@/services/modules/game.check.services";
import ChestCardLoading from "./components/ChestCardLoading";

interface IProps {
  onOpenChest?: () => void;
}

export default function ClaimedContainer({ onOpenChest }: IProps) {
  const { steamId, auth0Sub } = useAppSelector((p) => p.auth);
  const { data: mysteryChestData, isLoading: isMysteryLoading } = useGetMysteryChestQuery(auth0Sub, { skip: !steamId || !auth0Sub } );
  const { data: chestData, isLoading: isChestLoading } = useGetChestQuery(auth0Sub,{ skip: !steamId || !auth0Sub });

  return (
    <Flex w="full" my="15px" flexDirection="column">
      <Text variant="with-24">Claimed</Text>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} columnGap="20px">
        {mysteryChestData?.map((_, index) => (
          <ChestCard
            chestName="Mystery chest"
            text="0k"
            key={String(index)}
            src={`/chests/Mystery.svg`}
            isClaimed
            steamConnected={!!steamId}
            onOpenOrClaim={onOpenChest}
          />
        ))}

        {chestData?.map((chest, index) => {
          return (
            <ChestCard
              chestName={`${chest.chest.rarity} chest`}
              text="0k"
              key={String(index)}
              src={`/chests/${chest.chest.name}.svg`}
              isClaimed
              steamConnected={!!steamId}
              isDisable
            />
          );
        })}

        {isMysteryLoading &&  <ChestCardLoading />}
        {isChestLoading && Array(6).fill(0).map((_, index) => <ChestCardLoading key={String(index)} />)  }

        
      </SimpleGrid>
    </Flex>
  );
}
