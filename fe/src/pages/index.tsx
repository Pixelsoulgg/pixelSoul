import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useMemo } from "react";
import { getProfile } from "../apis";
import ComingSoon from "../components/ComingSoon";
import NFTTable from "../components/dashboards/NFTTable";
import StatCard from "../components/dashboards/StatCard";
import {
  Bundles_And_Packages,
  fonts,
  NFTsData,
  SBTs_And_Collectibles,
} from "../configs/constants";
import { getScoreAction } from "../reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { INftDashboardItem } from "../types";
import {
  MyCollectibles,
  MyNFTs,
  ProfileSection,
  StreamGeneralData,
} from "../views/dashboards";
import SteamContainer from "../views/dashboards/SteamContainer";
import WalletContainer from "../views/dashboards/WalletContainer";

const Home: NextPage = () => {
  const { walletInfo, score } = useAppSelector((s) => s.account);

  const [profile, setProfile] = React.useState<any>();
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    if (walletInfo && walletInfo.address) {
      dispatch(getScoreAction());
    }
  }, [walletInfo]);

  const nftsDatasource = useMemo(() => {
    if (!profile) return [];
    const { nfts } = profile.nftHolding;
    return nfts.map((nft: any) => {
      const item: INftDashboardItem = {
        img: "file.svg",
        name: nft.slug,
        kb: 0,
        amount: Number(nft.amount),
        floorPrice: Number(nft.floorPriceETH).toFixed(5),
        type: "UnCategorized",
      };
      return item;
    });
  }, [profile]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Head>
        <title>PixelSoul - Dashboard</title>
      </Head>

      <Flex flex={1} w="full" flexDirection={{ base: "column", lg: "row" }}>
        <ProfileSection />
        <Flex
          flex={{ base: 1, lg: 4 }}
          w="full"
          flexDirection="column"
          borderLeft={{ base: "none", lg: "1px solid #EAECF0" }}
          pl={{ base: "0px", lg: "32px" }}
        >
          <Flex w="full" flexDir="column">
            <HStack
              w="full"
              pb="21px"
              borderBottom="1px solid #EAECF0"
              mb="10px"
              mt={{ base: "70px", lg: "0px" }}
            >
              <VStack alignItems="flex-start">
                <Heading
                  size="md"
                  fontFamily={fonts.Inter}
                  color="#101828"
                  fontSize="18px"
                  fontWeight="600"
                  lineHeight="28px"
                >
                  Stats
                </Heading>
                <Text
                  color="#475467"
                  fontSize="14px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                  mt="4px"
                >
                  The higher your SoulScore the more valuable you are to Games
                  as a player.{" "}
                </Text>
              </VStack>
              <Spacer />
              <Image src="./three-dot.svg" />
            </HStack>

            <SimpleGrid columns={{ base: 1, sm: 2 }} w="full" columnGap="20px">
              <SteamContainer />
              <WalletContainer />
            </SimpleGrid>
          </Flex>
          <StreamGeneralData />
          <MyCollectibles />
          <MyNFTs />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
