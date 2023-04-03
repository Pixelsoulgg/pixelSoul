import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";

export default function SteamContainer() {
  const { steamInfo } = useAppSelector((state) => state.account);
  return (
    <Flex w="full" flexDir="column">
      {/* <Empty
        h="50px"
        imageStyle={{ w: "30px", h: "45px", mr: "7px" }}
        flexDirection="row"
        bg="transparent"
      /> */}
      {!steamInfo && (
        <Box
          cursor="pointer"
          bg="#194185"
          justifyContent="center"
          alignItems="center"
          display="flex"
          w="260px"
          h="44px"
          alignSelf="center"
          borderRadius="8px"
          px="16px"
        >
          <Text variant="with-title" fontSize="16px" color="white">
            Connect Steam
          </Text>
        </Box>
      )}
      {steamInfo && (
        <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} columnGap="24px">
          <StatCard title="SoulScore" value="999" percent={10} isUp />
          <StatCard title="GamerScore" value="999" percent={50} isUp={false} />
        </SimpleGrid>
      )}
    </Flex>
  );
}
