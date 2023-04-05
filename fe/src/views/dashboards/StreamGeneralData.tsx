import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import SteamTable from "./SteamTable";

export default function StreamGeneralData() {
  const { steamInfo } = useAppSelector((state) => state.account);
  return (
    <Flex w="full" flexDir="column" mt="30px">
      <Text variant="with-title" fontSize="18px" mb="10px">
        Steam General Data
      </Text>
      {!steamInfo && <Empty />}
      {steamInfo && (
        <Flex w="full">
          <SteamTable />
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            w="full"
            columnGap="20px"
            mt="20px"
          >
            <Flex w="full" flexDirection="column">
              <Text variant="with-title" fontSize="16px" fontWeight="500">
                Top Played Genres
              </Text>
              <StatCard title="Genre Game" value="999" percent={10} isUp />
              <StatCard
                title="Genre Game"
                value="999"
                percent={2}
                isUp={false}
              />
              <StatCard title="Genre Game" value="999" percent={10} isUp />
            </Flex>
            <Flex w="full" flexDirection="column">
              <Text variant="with-title" fontSize="16px" fontWeight="500">
                Top Played Games
              </Text>
              <StatCard title="Genre Game" value="999" percent={10} isUp />
              <StatCard
                title="Genre Game"
                value="999"
                percent={2}
                isUp={false}
              />
              <StatCard title="Genre Game" value="999" percent={10} isUp />
            </Flex>
          </SimpleGrid>
        </Flex>
      )}
    </Flex>
  );
}
