import { Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import SteamTable from "./SteamTable";
import { numberFormat } from "@/utils";
import { ButtonVariants } from "@/themes/theme";
import ComingSoon from "@/components/ComingSoon";

export default function StreamGeneralData() {
  const { steamId } = useAppSelector((state) => state.auth);
  const { steamUser } = useAppSelector((state) => state.soul);
  return (
    <Flex w="full" flexDir="column" mt="30px">
      <HStack mb="10px">
        <Button variant={ButtonVariants.WITH_ACTIVE} minW="103px" borderRadius="10px">Steam</Button>
        <Button variant={ButtonVariants.WITH_DEFAULT} minW="103px" borderRadius="10px" disabled isDisabled>Epic</Button>
      </HStack>

      <ComingSoon
        bgColor="#F9FAFB"
        justifyContent="center"
        alignItems="center"
        isCenter
        isVCenter
      />
      {/* {!steamId && <Empty />}
      {steamId && (
        <Flex w="full" flexDirection="column">
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
              {steamUser?.topGenre.map((p) => (
                <StatCard
                  title={p.genre}
                  value={numberFormat(p.hours)}
                  percent={0}
                  isUp
                  key={p.genre}
                />
              ))}
            </Flex>
            <Flex w="full" flexDirection="column">
              <Text variant="with-title" fontSize="16px" fontWeight="500">
                Top Played Games
              </Text>

              {steamUser?.topGame.map((p, index) => (
                <StatCard
                  title={p.name}
                  value={numberFormat(p.playtime_forever)}
                  percent={0}
                  isUp={index % 2 === 0}
                  key={p.name}
                />
              ))}
            </Flex>
          </SimpleGrid>
        </Flex>
      )} */}
    </Flex>
  );
}
