import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import Link from "next/link";
import { numberFormat } from "@/utils";


export default function SteamContainer() {
  const { steamInfo } = useAppSelector((state) => state.auth); 
  const {steamUser} = useAppSelector(p => p.soul) ;
  const {score} = useAppSelector(p => p.account) ;

  const isAuth = useMemo(() => {
    if (!steamInfo) return false;
    return steamInfo['openid.sig'] !== undefined;
  }, [steamInfo]);

  const soulScore = useMemo(() => {    
    if (!steamInfo) return 0;
    return  ((steamUser?.point || 0) * 0.7) + ((score?.collectorLevel || 0) * 0.2) + ((score?.investorLevel || 0) * 0.1)
  }, [score?.collectorLevel, score?.investorLevel, steamInfo, steamUser?.point]);

  return (
    <Flex w="full" flexDir="column" mt={{ base: "10px"}}>
      {!isAuth && (<Link href={process.env.NEXT_PUBLIC_STEAM_AUTH_URL || ''}>
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
      )}
      {isAuth && (
        <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} columnGap="24px">
          <StatCard title="SoulScore" value={numberFormat(soulScore)} percent={0} isUp />
          <StatCard title="GamerScore" value={numberFormat(steamUser?.point || 0)} percent={0} isUp={false} />
        </SimpleGrid>
      )}
    </Flex>
  );
}
