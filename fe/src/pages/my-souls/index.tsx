import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
  SimpleGrid,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  MySouldDropChests,
  ProfileSection,
  StreamGeneralData,
} from "@/views/dashboards";
import { fonts } from "@/configs/constants";
import WalletContainer from "@/views/dashboards/WalletContainer";
import SteamContainer from "@/views/dashboards/SteamContainer";
import { useCallback, useEffect } from "react";
import { getScoreAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import Layout from "@/layouts";
import { useRouter } from "next/router";
import { OpenIDData } from "@/types";
import {
  handleConnectMetamaskSuccess,
  setSteamInfoAction,
} from "@/reduxs/auths/auth.slices";
import {
  getNFTsAction,
  getSteamPlayerGeneralAction,
} from "@/reduxs/souls/soul.slices";
import { ButtonVariants } from "@/themes/theme";
import MintSoulTagModal from "@/views/dashboards/MintSoulTagModal";
import SoulTagNftInfo from "@/views/dashboards/SoulTagNftInfo";

MySoul.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function MySoul() {
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const {isOpen: isMintSoulTag, onClose, onOpen} = useDisclosure();

  const { walletInfo } = useAppSelector((s) => s.account);
  const { auth0Info, auth0Sub, steamId, accessToken } = useAppSelector((s) => s.auth);
  const {soulTagNft} = useAppSelector((p) => p.suinft);

  const handleSteamAuth = useCallback(() => {
    //@ts-ignore
    const query: OpenIDData | undefined = router.query;
    if (query && query["openid.identity"] !== undefined) {
      if (auth0Info) {
        dispatch(setSteamInfoAction(query));
      }
    }
  }, [auth0Info, dispatch, router.query]);

  useEffect(() => {
    handleSteamAuth();
  }, [handleSteamAuth]);

  const fetchData = useCallback(async () => {
    try {
      if (auth0Sub) {
        const walletAddress = auth0Info?.walletAddress || walletInfo?.address;
        if (walletAddress) {
          dispatch(handleConnectMetamaskSuccess({ walletAddress }));
          dispatch(getScoreAction(walletAddress));
          dispatch(getNFTsAction(walletAddress));
        }
      }
      if (steamId) {
        dispatch(getSteamPlayerGeneralAction(steamId));
      }
    } catch (er) {
      console.log({ er });
    }
  }, [dispatch, walletInfo, steamId, auth0Sub, auth0Info]);

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
              mb="30px"
              mt={{ base: "70px", lg: "0px" }}
              border="1px solid #D0D5DD"
              p="20px"
              borderRadius="12px"
            >
              <VStack alignItems="flex-start" w="full">
                <Heading
                  size="md"
                  fontFamily={fonts.Inter}
                  color="#101828"
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight="28px"
                >
                  SoulTag
                </Heading>
                <Text
                  color="#475467"
                  fontSize="18px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                  mt="4px"
                >
                  Mint SoulTag to get access to the Pixelsoul ecosystem of games and partners.
                </Text>
               {soulTagNft && <SoulTagNftInfo />}
              </VStack>
              <Spacer />
              {!soulTagNft &&<VStack>
                <Button
                  variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}
                  minW="135px"
                  borderRadius="6px !important"
                  onClick={() => onOpen()}
                >
                  Mint SoulTag
                </Button>
              </VStack>
              }
            </HStack>

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
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight="28px"
                >
                  Stats
                </Heading>
                <Text
                  color="#475467"
                  fontSize="18px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                  mt="4px"
                >
                  Your SoulScore and GamerScore unlock special perks and can be
                  increased by completing challenges and playing games.
                </Text>
              </VStack>
            </HStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} w="full" columnGap="20px">
              <SteamContainer />
              <WalletContainer />
            </SimpleGrid>
          </Flex>
          <StreamGeneralData />
          {/* <MyCollectibles /> */}
          <MySouldDropChests />
        </Flex>
      </Flex>

      <MintSoulTagModal 
        isOpen={isMintSoulTag}
        onClose={onClose}        
      />
    </>
  );
}
