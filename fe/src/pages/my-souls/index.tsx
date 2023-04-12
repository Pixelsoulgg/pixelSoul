import { Flex, HStack, Heading, Spacer, Text, VStack, Image, SimpleGrid } from '@chakra-ui/react'
import { MyCollectibles, MyNFTs, ProfileSection, StreamGeneralData } from '@/views/dashboards'
import { fonts } from '@/configs/constants'
import WalletContainer from '@/views/dashboards/WalletContainer'
import SteamContainer from '@/views/dashboards/SteamContainer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getScoreAction } from '@/reduxs/accounts/account.actions'
import { useAppDispatch, useAppSelector } from '@/reduxs/hooks'
import Layout from '@/layouts'
import { useRouter } from 'next/router'
import { OpenIDData } from '@/types'
import { handleConnectMetamaskSuccess, setSteamInfoAction, steamAuthSuccess } from '@/reduxs/auths/auth.slices'


MySoul.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};


export default function MySoul() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { walletInfo } = useAppSelector((s) => s.account);
  const {auth0Info} = useAppSelector(s => s.auth);

  const handleSteamAuth = useCallback(() => {
    //@ts-ignore
    const query: OpenIDData | undefined = router.query;
    if (query && query["openid.identity"] !== undefined) {
      if (auth0Info) {
        dispatch(setSteamInfoAction(query))
      }
    }
  }, [auth0Info, dispatch, router.query]);

  useEffect(() => {
    handleSteamAuth();  
  }, [handleSteamAuth]);

  const fetchData = useCallback(async () => {
    if (walletInfo && walletInfo.address && auth0Info && auth0Info.auth0Sid) {      
      dispatch(handleConnectMetamaskSuccess({walletAddress: walletInfo.address, auth0Id: auth0Info.auth0Sid}))
      dispatch(getScoreAction());
    }
  }, [auth0Info, dispatch, walletInfo]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <>
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
                  as a player.
                </Text>
              </VStack>
              <Spacer />
              <Image src="./three-dot.svg" alt="" />
            </HStack>

            <SimpleGrid columns={{ base: 1, sm: 2 }} w="full" columnGap="20px">
              <SteamContainer />
              <WalletContainer />
            </SimpleGrid>
          </Flex>
          <StreamGeneralData />
           <MyCollectibles />
         {/* <MyNFTs /> */}
        </Flex>
      </Flex>
    </>
  )
}
