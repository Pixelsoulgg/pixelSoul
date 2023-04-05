import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import GameCard from "@/components/dashboards/GameCard";

import Layout from '@/layouts'

AllGames.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function AllGames() {
  return (
    <Flex flex={1} w="full" flexDirection="column">
      <Flex w="full" borderBottom="1px solid #EAECF0" flexDirection="column"  pb="16px">
        <Text variant="with-title" fontSize="18px">
          Featured
        </Text>
        <Text variant="with-title" fontSize="14px" color="#475467"  fontWeight="normal" mt="-10px">
          We love these games
        </Text>
      </Flex>

      <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} w="full" gap="20px" mt="16px">
        <GameCard />
        <GameCard />
        <GameCard />
      </SimpleGrid>


      <Flex w="full" borderBottom="1px solid #EAECF0" flexDirection="column" pb="16px" mt="20px">
        <Text variant="with-title" fontSize="18px">
          All Games
        </Text>
        <Text variant="with-title" fontSize="14px" color="#475467"  fontWeight="normal" mt="-10px">
          We love these games
        </Text>
      </Flex>

      <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} w="full" gap="20px" mt="16px">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </SimpleGrid>
    </Flex>
  );
}
