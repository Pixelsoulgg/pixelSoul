import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import Link from "next/link";


export default function SteamContainer() {
  const { steamInfo } = useAppSelector((state) => state.auth); 
  
  const isAuth = useMemo(() => {
    if (!steamInfo) return false;
    return steamInfo['openid.sig'] !== undefined;
  }, [steamInfo]);

  return (
    <Flex w="full" flexDir="column">
      {/* <Empty
        h="50px"
        imageStyle={{ w: "30px", h: "45px", mr: "7px" }}
        flexDirection="row"
        bg="transparent"
      /> */}
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
          <StatCard title="SoulScore" value="0" percent={0} isUp />
          <StatCard title="GamerScore" value="0" percent={0} isUp={false} />
        </SimpleGrid>
      )}
    </Flex>
  );
}
