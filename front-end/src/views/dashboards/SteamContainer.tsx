import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";

export default function SteamContainer() {
  return (
    <Flex w="full" flexDir="column">
      <Empty
        h="50px"
        imageStyle={{ w: "30px", h: "45px", mr: "7px" }}
        flexDirection="row"
        bg="transparent"
      />
      <Box
        cursor="pointer"
        bg="#194185"
        justifyContent="center"
        alignItems="center"
        display="flex"
        w="auto"
        h="44px"
        alignSelf="center"
        borderRadius="8px"
        px="16px"
      >
        <Text variant="with-title" fontSize="16px" color="white">
        Connect Steam to recieve SoulSocre
        </Text>
      </Box>
      <SimpleGrid w="full" columns={{ base: 1,lg: 2 }} columnGap="24px">
        <StatCard title="SoulScore" value="999" percent={10} isUp />
        <StatCard
          title="GamerScore"
          value="999"
          percent={50}
          isUp={false}
        />
      </SimpleGrid>
    </Flex>
  );
}
