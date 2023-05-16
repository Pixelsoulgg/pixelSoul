import { StatCard } from "@/components/dashboards";
import Layout from "@/layouts";
import { useAppSelector } from "@/reduxs/hooks";
import { useClaimMysteryChestMutation } from "@/services/modules/game.check.services";
import { numberFormat } from "@/utils";
import { AvailableMysteryChest, ClaimedContainer } from "@/views/soulDrops";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import React, {useEffect } from "react";

SoulDrop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function SoulDrop() {
  const [claimChest, claimChestResult] = useClaimMysteryChestMutation();
  const { auth0Sub } = useAppSelector((p) => p.auth);

  useEffect(() => {
    const handleClaimChest = async () => {
      try {
        if (auth0Sub) {
          await claimChest(auth0Sub).unwrap();
        }
      } catch (er) {}
    };

    handleClaimChest();
  }, [auth0Sub]);

  return (
    <Flex w="full" flexDirection="column">
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} columnGap="24px">
        <StatCard
          title="My Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Common Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Mythic Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Legendary Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
      </SimpleGrid>
      <ClaimedContainer />
      <AvailableMysteryChest />
    </Flex>
  );
}
