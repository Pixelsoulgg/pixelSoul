import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import Search from "../../components/Search";
import HeaderMobile from "./HeaderMobile";
import Sidebar from "./Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { SoulScoreButton } from "@/components/dashboards";
import { numberFormat } from "@/utils";

export interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  const { user } = useUser();
  const { me } = useGlobal();
  const router = useRouter();

  const meModel = user || me;

  const { steamUser } = useAppSelector((p) => p.soul);
  const { score } = useAppSelector((p) => p.account);

  const soulScore = useMemo(() => {
    return (
      (steamUser?.point || 0) * 0.7 +
      (score?.collectorLevel || 0) * 0.2 +
      (score?.investorLevel || 0) * 0.1
    );
  }, [score?.collectorLevel, score?.investorLevel, steamUser?.point]);

  const { onMenuChange } = useGlobal();

  const { pathname } = router;

  const isHideSearch = useMemo(() => {
    const checkList = [
      "/my-souls",
      "/taverns",
      "/forges",
      "/epochs",
      "/soul-drops",
      "/event-boards",
      "/referrals",
      "/game-hubs",
    ];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [pathname]);

  const isHideBack = useMemo(() => {
    const checkList = [
      "/my-souls",
      "/dungeons",
      "/taverns",
      "/forges",
      "/epochs",
      "/soul-drops",
      "/event-boards",
      "/referrals",
      "/game-hubs",
    ];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [pathname]);

  const isHideHeader = useMemo(() => {
    const checkList = ["/games/detail"];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [pathname]);

  const getTitle = useMemo(() => {
    switch (pathname.toLocaleLowerCase()) {
      case "/taverns":
        return "Tavern";
      case "/forges":
        return "Forge of Legends";
      case "/epochs":
        return "Epoch";
      case "/profiles/collectible":
        return "My Collectibles";
      case "/profiles/nfts":
        return "My NFT";
      case "/dungeons":
        return "Dungeon";
      case "/my-souls":
        return `Welcome to PixelSoul, ${meModel?.name || ""}`;
      case "/soul-drops":
        return "SoulDrop";
      case "/event-boards":
        return "Events";
      case "/referrals":
        return "SoulDrop, #GametagID";
      case "/game-hubs":
        return "Game hub";
      default:
        return "";
    }
  }, [pathname, meModel?.name]);

  useEffect(() => {
    onMenuChange && onMenuChange(router.pathname);
  }, [router.pathname]);

  return (
    <Flex
      w="100%"
      margin="0px auto"
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Sidebar display={{ base: "none", lg: "flex" }} minH="110vh" />
      <HeaderMobile display={{ base: "flex", lg: "none" }} />
      <Flex
        flexDirection="column"
        w="100%"
        px={!isHideHeader ? "0px" : "20px"}
        py={!isHideHeader ? "0px" : "20px"}
        minH="100vh"
        justifyContent="flex-start"
        alignItems="center"
        overflowX="hidden"
      >
        {isHideHeader && (
          <Flex
            w="full"
            justifyContent="space-between"
            alignContent="center"
            py="12px"
            borderBottom="1px solid #EAECF0"
            mb="32px"
          >
            <HStack>
              {isHideBack && (
                <Button bg="transparent" onClick={() => router?.back()}>
                  <Image src="/back.svg" alt="back" />
                </Button>
              )}
              <Text variant="with-title" fontSize="40px">
                {getTitle}
              </Text>
            </HStack>
            {!isHideSearch && (
              <SoulScoreButton soul={numberFormat(soulScore)} />
            )}
            {isHideSearch && (
              <Search
                paddingY="0px"
                w="320px"
                display={{ base: "none", lg: "flex" }}
              />
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  );
}
