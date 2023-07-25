import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import Link from "next/link";
import { numberFormat } from "@/utils";
import { getSteamAuthUrl } from "@/utils/env.helpers";
import ComingSoon from "@/components/ComingSoon";

export default function SteamContainer() {
  const { steamInfo, steamId } = useAppSelector((state) => state.auth);
  const { steamUser } = useAppSelector((p) => p.soul);
  const { score } = useAppSelector((p) => p.account);

  const soulScore = useMemo(() => {
    return (
      (steamUser?.point || 0) * 0.7 +
      (score?.collectorLevel || 0) * 0.2 +
      (score?.investorLevel || 0) * 0.1
    );
  }, [score?.collectorLevel, score?.investorLevel, steamUser?.point]);

  return (
    <Flex w="full" flexDir="column" mt={{ base: "10px" }}>
      {!steamId && (
        <ComingSoon funcName="Connect_Steam" isCenter>
        <Link href={getSteamAuthUrl() || ""}>
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
        </Link>
        </ComingSoon>
      )}
      {steamId && (
        <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} columnGap="24px">
          <StatCard
            title="SoulScore"
            value={numberFormat(soulScore)}
            percent={0}
            isUp
          />
          <StatCard
            title="GamerScore"
            value={numberFormat(steamUser?.point || 0)}
            percent={0}
            isUp={false}
            ml={{ base: 0, lg: "24px" }}
          />
        </SimpleGrid>
      )}
    </Flex>
  );
}
